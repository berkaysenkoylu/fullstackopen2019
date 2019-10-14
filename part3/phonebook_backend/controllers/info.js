// Route that yields how many people there are in the phonebook
// It also provides the information of when the request happens

const Person = require('../models/Person');

exports.getInfo = (req, res, next) => {
    Person.find().then(result => {
        return res.send(
            '<p>Phonebook has info for ' + result.length + ' people</p> <p>' + new Date() + '</p>'
        );
    });
}