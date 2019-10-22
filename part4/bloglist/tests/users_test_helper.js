const User = require('../models/user');

// This is just test purposes only, I obviously wouldn't want to store passwords un-hashed,
// not to mention, I wouldn't send the password to the client-side, hashed or otherwise
const initialUserList = [
    {
        username: "John",
        name: "John Doe",
        password: "123456"
    },
    {
        username: "Jonny",
        name:"johhny doe",
        password: "123456"
    }
];

let inialFetchedUsers = [];

const createUsers = async () => {

    for(let user of initialUserList)
    {
        const newUser = new User({
            username: user.username,
            name: user.name,
            password: user.password
        });

        await newUser.save();
    }

    const currentUsersInDb = await User.find();

    return currentUsersInDb;
}

const resetTestDatabase = async () => {
    
    await User.deleteMany();

    inialFetchedUsers = createUsers();
}

module.exports = {
    inialFetchedUsers,
    resetTestDatabase
}