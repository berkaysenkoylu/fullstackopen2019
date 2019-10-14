// Part 3.12

const mongoose = require('mongoose');

//const password = 'bIqBESAOrU4pTg96';

const password = process.argv[2];

const url = `mongodb+srv://berkay_admin:${password}@projects-1orr9.mongodb.net/FSO2019?retryWrites=true&w=majority`;

// ========================================================= //

// Schema and model
const personSchema = mongoose.Schema({
    name: { type: String, required: true },
    number: { type: String, required: true }
});

const Person = mongoose.model("Person", personSchema);

// ========================================================= //

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Database connection is successful");

    // If enough arguments are present, it means we want to add a new person
    if (process.argv.length > 3) {
        const newPerson = new Person({
            name: process.argv[3],
            number: process.argv[4]
        });
    
        // console.log(newPerson.name, newPerson.number);
    
        newPerson.save(err => {
            if(err) {
                console.log("Failed to add a new person");
                return;
            }
    
            console.log(`Added ${newPerson.name}, number ${newPerson.number} to phonebook`);
            mongoose.connection.close();
        });
    }
    else 
    {
        // Otherwise, just log what we have so far in the DB
        Person.find((err, persons) => {
            if(err) {
                console.log(err);
                mongoose.connection.close();
                return;
            }

            console.log("Phonebook:");
            persons.forEach(person => {
                console.log(person.name, person.number);
            })
            mongoose.connection.close();
        });
    }

    
}).catch((error) => {
    console.log(error);
    console.log("Database connection failed");
});