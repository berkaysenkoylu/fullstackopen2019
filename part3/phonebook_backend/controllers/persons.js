// Imports
const Person = require('../models/Person');

// Get all the persons
exports.getAllPersons = (req, res, next) => {
    Person.find().then(result => {
        const data = result.map(res => {
            return {
                id: res._id.toString(),
                name: res.name,
                number: res.number
            };
        });
        
        return res.status(200).json({
            message: "Successfully fetched all the persons",
            data: data
        });
    })
    
}

// Get only one person
exports.getOnePerson = (req, res, next) => {
    // Alternatively, we can check if given id is of a proper form by using: req.params.id.match(/^[0-9a-fA-F]{24}$/)

    Person.findById({ _id: req.params.id }, (err, result) => {
        if (!err) {
            // console.log(result);
            if(result === {} || !result || result === undefined) {
                next({ error: "Undefined person data", message: "No such user was found!", status: 404 });
                // return res.status(404).json({
                //     message: "No such user was found!"
                // });
            }
            else {
                return res.status(200).json({
                    message: "Successfully fetched the user with a given id",
                    data: result
                });
            }
        }
        else 
        {
            next({ error: "Check the id of person you requested", message: "Wrong id format", status: 500 });
            // return res.status(400).json({

            // });
        }
    })


    // Person.findById({ _id: req.params.id }).then(result => {
    //     if(result === {} || !result || result === undefined) {
    //         next({ error: "Undefined person data", message: "No such user was found!", status: 404 });
    //         // return res.status(404).json({
    //         //     message: "No such user was found!"
    //         // });
    //     }
    //     else {
    //         return res.status(200).json({
    //             message: "Successfully fetched the user with a given id",
    //             data: result
    //         });
    //     }
    // }).catch(error => {
    //     next({ error: "Check the id of person you requested", message: "Wrong id format", status: 500 });
    //     // return res.status(500).json({
    //     //     message: "Wrong id format",
    //     //     error: error
    //     // });
    // });
}

// Delete one person
exports.deleteOnePerson = (req, res, next) => {
    Person.deleteOne({ _id: req.params.id }).then(result=> {
        if(result.n !== 0) {
            return res.status(200).json({
                message: "Successfully deleted one person"
            });
        }
        else {
            return res.status(500).json({
                message: "Failed to delete the person with given id"
            });
        }
    });
}

// Add a new person
exports.addNewPerson = (req, res, next) => {
    if((req.body.name === undefined || req.body.number === undefined) || (req.body.name === "" || req.body.number === "")) {
        next({ error: "Empty form fields", message: "You cannot leave form fields empty", status: 400 });
        // return res.status(400).json({
        //     message: "You require to provide name or number"
        // });
        return;
    }

    Person.find().then(result => {
        // This was before the mongoose validator
        const filteredPersons = result.filter(person => person.name === req.body.name);

        if(filteredPersons.length > 0) {
            return res.status(500).json({
                message: "The name already exists"
            });
        }
        // 

        const newPerson = new Person({
            "name": req.body.name,
            "number": req.body.number
        });

        newPerson.save((err, result) => {
            if (!err) {
                return res.status(200).json({
                    message: 'A new person has been successfully created',
                    data: result
                });
            }
            else {
                if (err.errors.number) {
                    next({ error: 'Failed to create a new person', message: err.errors.number.message, status: 400 });
                }
                else if (err.errors.name) {
                    next({ error: 'Failed to create a new person', message: err.errors.name.message, status: 400 });
                }
                else {
                    next({ error: 'Failed to create a new person', message: 'Something wrong with mongoose', status: 400 });
                }
               
            }
        });
    });
}

// Edit the person with a given id
exports.editPerson = (req, res, next) => {
    const newPersonData = new Person({
        _id: req.params.id,
        name: req.body.name,
        number: req.body.number
    });

    Person.updateOne({ _id: req.params.id }, newPersonData).then(result => {
        if (result.n !== 0) {
            return res.status(200).json({
                message: 'Person has been updated successfully!',
                data: newPersonData
            });
        }
        else {
            return res.status(500).json({
                message: 'Failed to update the person data!'
            });
        }
    }).catch(error => {
        return res.status(500).json({
            message: 'Failed to update person data!',
            error: error
        });
    });
}