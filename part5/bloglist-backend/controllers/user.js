const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

// Fetch all the users from the database
exports.getAllUsers = async (req, res, next) => {
    try
    {
        const users = await User.find().populate({ path: 'blogs', model: 'Blog' });
        // console.log(users);

        // Remove the password fields
        const modifiedUsers = users.map(user => {
            return {
                id: user._id,
                username: user.username,
                name: user.name,
                blogs: user.blogs
            }
        });

        res.status(200).json({
            message: "Users have been successfully fetched",
            data: modifiedUsers
        });
    }
    catch(exception)
    {
        console.log(exception);
        next(exception);
    }
}

// Create a new user
exports.createUser = async (req, res, next) => {
    // Check password length before hashing it
    if(req.body.password.length < 3) {
        return res.status(500).json({
            message: 'Password must be at least 3 characters long'
        });
    }

    try
    {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = new User({
            username: req.body.username,
            name: req.body.name,
            password: hashedPassword
        });

        const savedUser = await newUser.save();

        res.status(200).json({
            message: 'User has been created',
            data: {
                id: savedUser._id,
                username: savedUser.username,
                name: savedUser.name
            }
        });
    }
    catch(exception)
    {
        const errorMessages = [];
        Object.keys(exception.errors).forEach(field => {
            errorMessages.push(exception.errors[field].message)
        });

        res.status(500).json({
            message: errorMessages.join(' ')
        });

        next(exception);
    }
}

// Log in the existing user if requirements are met (User exists, password correct, ..etc)
exports.loginUser = async (req, res, next) => {
    let fetchedUser = await User.findOne({ username: req.body.username });

    const isPasswordCorrect = fetchedUser === null ? false : await bcrypt.compare(req.body.password, fetchedUser.password);

    if (!(fetchedUser && isPasswordCorrect)) {
        return res.status(401).json({
            message: 'Invalid username or password'
        });
    }

    const token = jwt.sign({ username: fetchedUser.username, userId: fetchedUser._id }, process.env.SECRET);

    return res.status(200).json({
        token: token,
        userId: fetchedUser._id,
        username: fetchedUser.username
    });
}

// exports.loginUser = (req, res, next) => {
//     let fetchedUser;

//     User.findOne({ username: req.body.username }, (err, user) => {
//         if(err){
//             return res.status(401).json({
//                 message: 'Invalid authentication credentials',
//                 error: error
//             });
//         }
//         else {
//             if(!user) {
//                 return res.status(401).json({
//                     message: 'Authentication failed! No such user was found.'
//                 });
//             }

//             fetchedUser = user;

//             return bcrypt.compare(req.body.password, fetchedUser.password).then(result => {
//                 if(!result){
//                     return res.status(401).json({
//                         message: 'Wrong password!'
//                     });
//                 }

//                 const token = jwt.sign({ username: fetchedUser.username, userId: fetchedUser._id }, process.env.SECRET);

//                 res.status(200).json({
//                     token: token,
//                     userId: fetchedUser._id,
//                     username: fetchedUser.username
//                 });
//             });
//         }
//     });
// }


// Delete the user with a given id
exports.deleteUser = async (req, res, next) => {
    try
    {
        await User.deleteOne({ _id: req.params.id });

        res.status(200).json({
            message: "User has been successfully deleted"
        });
    }
    catch(exception)
    {
        next(exception);
    }
}