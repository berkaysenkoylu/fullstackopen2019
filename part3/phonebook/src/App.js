import React, { useState, useEffect } from 'react';
import personService from './Services/PersonService/personService';

import './App.css';

import Filter from './Components/Filter/Filter';
import PersonForm from './Components/Persons/PersonForm/PersonForm';
import Persons from './Components/Persons/Persons';
import Message from './Components/UserFeedback/Message/Message';

const App = () => {
  const [ persons, setPersons] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ showName, setShowName ] = useState('');
  const [ message, setMessage ] = useState(null); 

  useEffect(() => {
    personService.getAllPersons().then(persons => {
      setPersons(persons);
    })
  }, []);

  const nameInputChangeHandler = (event) => {
    setNewName(event.target.value);
  }

  const numberInputChangeHandler = (event) => {
    setNewNumber(event.target.value);
  }

  const onFilterChangeHandler = (event) => {
    setShowName(event.target.value);
  }

  const addNewPhoneNumberHandler = (event) => {
    event.preventDefault();

    let copiedPhoneBook = [...persons];

    // Check if we should edit, instead of adding a new contact
    let duppArr = copiedPhoneBook.filter(person => person.name === newName);
    if (duppArr.length > 0) {
      if(window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)){
        // Replace the number
        const personData = duppArr[0];
        const newPersonData = { _id: personData.id, name: personData.name, number: newNumber };
        
        personService.editPerson(personData.id, newPersonData).then(newData => {
          const data = {...newData};
          delete data['_id'];
          data['id'] = personData.id;

          setPersons(persons.map(person => person.id !== personData.id ? person : data));
          createMessage(false, `Information of ${personData.name} has been successfully updated`);
          setNewName("");
          setNewNumber("");
        }).catch(error => {
          createMessage(true, `Information of ${personData.name} has already been removed from server`);
        });
      }
      return;
    }

    const newPerson = { name: newName, number: newNumber };

    // Backend connection
    personService.createPerson(newPerson).then(newlyCreatedPerson => {
      // Add the new person to the copied phonebook
      
      const newlyCreatedPersonFormatted = {
        id: newlyCreatedPerson._id,
        name: newlyCreatedPerson.name,
        number: newlyCreatedPerson.number
      };

      copiedPhoneBook = copiedPhoneBook.concat(newlyCreatedPersonFormatted);

      // Update the state
      setPersons(copiedPhoneBook);
      createMessage(false, `Successfully added ${newPerson.name}`);
      setNewName("");
      setNewNumber("");
    }).catch(error => {
      createMessage(true, error.response.data.message);
    });
  }

  const createMessage = (isError, message) => {

    setMessage({
      isError: isError, message: message
    });

    setTimeout(() => {
      setMessage(null);
    }, 3000);

  }

  const onDeletePersonHandler = (id) => {
    const personName = persons.filter(person => person.id === id)[0].name;

    if (window.confirm(`You really want to delete ${personName}?`)){
      personService.deletePerson(id).then(() => {
        let copiedPersonArr = [...persons];
        copiedPersonArr = copiedPersonArr.filter(person => person.id !== id);
        setPersons(copiedPersonArr);
        createMessage(false, `Information of ${personName} has been successfully deleted`);
      }).catch(error => {
        createMessage(true, `Failed to remove ${personName}`);
      });
    }
    else {
      return;
    }
    
  }

  return (
    <div className="App">
      <h2>Phonebook</h2>

      {message ? <Message error={ message.isError }>{ message.message }</Message> : null}
      
      <Filter onFilterInputChanged={onFilterChangeHandler} />

      <h3>add a new</h3>

      <PersonForm 
        name={newName} 
        number={newNumber} 
        nameInputChanged={nameInputChangeHandler}
        numberInputChanged={numberInputChangeHandler}
        onNewPersonAdded={(event) => addNewPhoneNumberHandler(event)} />

      <h2>Numbers</h2>

      <Persons personList={persons} filterName={showName} deletedPersonId={onDeletePersonHandler} />
    </div>
  );
}

export default App;
