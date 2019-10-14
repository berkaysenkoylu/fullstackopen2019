const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const personSchema = mongoose.Schema({
    name: { type: String, required: true, minlength: 3, unique: true },
    number: { type: String, required: true, minlength: 8 }
});

personSchema.plugin(uniqueValidator, { message: 'Contact already exists!' });

module.exports = mongoose.model("Person", personSchema);