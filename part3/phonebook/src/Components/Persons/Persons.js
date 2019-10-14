import React from 'react';

import Person from './Person/Person';

const Persons = (props) => {

    const onPersonDeleteHandler = (id) => {
        // Pass this data to the parent object
        // I want to handle all HTTP requests in the same place (App.js in this case)
        props.deletedPersonId(id);
    }


    let personsContent = null;
    let filteredContent = props.personList.filter(person => person.name === props.filterName)[0];

    if (filteredContent) {
        personsContent = <Person name={filteredContent.name} number={filteredContent.number} personDeleted={() => onPersonDeleteHandler(filteredContent.id)} />;
    }
    else {
        personsContent = props.personList.map(person => {
            return <Person key={person.id} name={person.name} number={person.number} personDeleted={() => onPersonDeleteHandler(person.id)} />;
        });
    }

    return (
        <div>
            {personsContent}
        </div>
    );
}

export default Persons;
