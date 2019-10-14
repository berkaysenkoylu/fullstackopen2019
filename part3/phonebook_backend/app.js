require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const errorHandler = require('./middlewares/errorHandler');

const persons = require('./routes/persons');
const info = require('./routes/info');

const app = express();

// Database connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Database connection is successful");
}).catch(() => {
    console.log("Database connection failed");
});

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use(morgan('tiny')); // 3.7
// app.use(morgan(function (tokens, req, res) {
//     morgan.token('content-content', function (req, res) { return JSON.stringify(req.body) }); // 3.8*

//     return [
//       tokens.method(req, res),
//       tokens.url(req, res),
//       tokens.status(req, res),
//       tokens.res(req, res, 'content-length'), '-',
//       tokens['response-time'](req, res), 'ms',
//       tokens['content-content'](req, res)
//     ].join(' ')
// }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    next();
});

app.use(express.static('build'));

//
// I split this part for Part 3.18* in the same way the app is constructed.
// We have a controller, and a route for info route.
//
// Part 3.2
// app.get('/info', (req, res, next) => {
//     const peopleCount = 5;

//     res.send(
//         '<p>Phonebook has info for ' + peopleCount + ' people</p> <p>' + new Date() + '</p>'
//     );
// });

// Routes
app.use('/api/persons', persons);
app.use('/info', info);

// Error handler middleware
app.use(errorHandler);

module.exports = app;