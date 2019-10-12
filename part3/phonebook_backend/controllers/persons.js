// Imports

const persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "11-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    },
    {
        "name": "Evelyn Harper",
        "number": "666-SATAN",
        "id": 5
    }
];


// Get all the persons
exports.getAllPersons = (req, res, next) => {
    return res.status(200).json({
        message: "Successfully fetched all the persons",
        persons: persons
    });
}

// Get only one person
exports.getOnePerson = (req, res, next) => {
    const fetchedPerson = persons.filter(person => person.id === +req.params.id);

    if (fetchedPerson.length > 0) {
        return res.status(200).json({
            message: "Successfully fetched one person",
            person: persons.filter(person => person.id === +req.params.id)
        });
    }
    else {
        return res.status(404).json({
            message: "No person with the given id"
        });
    }
}

// Delete one person
exports.deleteOnePerson = (req, res, next) => {
    const newPersonsArr = persons.filter(person => {
        return person.id !== +req.params.id
    });

    return res.status(200).json({
        message: "Successfully deleted one person",
        data: newPersonsArr
    });
}

// Add a new person
exports.addNewPerson = (req, res, next) => {
    if((req.body.name === undefined || req.body.number === undefined) || (req.body.name === "" || req.body.number === "")) {
        return res.status(500).json({
            message: "You require to provide name or number"
        });
    }

    const filteredPersons = persons.filter(person => person.name === req.body.name);

    if(filteredPersons.length > 0) {
        return res.status(500).json({
            message: "The name already exists"
        });
    }


    const newPerson = {
        "name": req.body.name,
        "number": req.body.number,
        "id": Math.random() * 1000
    }

    persons.push(newPerson);

    res.status(200).json({
        message: "Successfully added a new person",
        data: persons
    });
}