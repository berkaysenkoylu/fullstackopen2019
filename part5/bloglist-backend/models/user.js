const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true, minlength: 3 },
    name: { type: String, required: true },
    password: { type: String, required: true, minlength: 3 },
    blogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
      }
    ]
});

userSchema.plugin(uniqueValidator, { message: 'Username already exists' });

module.exports = mongoose.model('User', userSchema);
