require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const blogs = require("./routes/blog");
const users = require('./routes/user');

const app = express();

let url = process.env.MONGODB_URI;

if(process.env.NODE_ENV === 'test') {
    url = process.env.TEST_MONGODB_URI;
}

mongoose.set('useCreateIndex', true);

// Database Connection
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    if(process.env.NODE_ENV !== 'test')
        console.log("Connected to database!");
}).catch(() => {
    if(process.env.NODE_ENV !== 'test')
        console.log("Failed to connect to database!");
});

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    next();
});

// Routes
app.use("/api/blogs", blogs);
app.use("/api/users", users);

module.exports = app;