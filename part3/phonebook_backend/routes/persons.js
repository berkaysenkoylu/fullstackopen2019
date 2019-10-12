const express = require('express');

const personsController = require('../controllers/persons');

const router = express.Router();

// Fetch all the persons
router.get('', personsController.getAllPersons);

// Fetch only one person
router.get('/:id', personsController.getOnePerson);

// Create a new person
router.post('', personsController.addNewPerson);

// Delete the person with a given id
router.delete('/:id', personsController.deleteOnePerson);

module.exports = router;