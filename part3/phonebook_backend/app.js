const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const persons = require('./routes/persons');

const app = express();

// Database connection (TODO)

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// app.use(morgan('tiny')); // 3.7
app.use(morgan(function (tokens, req, res) {
    morgan.token('content-content', function (req, res) { return JSON.stringify(req.body) }); // 3.8*

    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      tokens['content-content'](req, res)
    ].join(' ')
}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    next();
});

// Part 3.2
app.get('/info', (req, res, next) => {
    const peopleCount = 5;

    res.send(
        '<p>Phonebook has info for ' + peopleCount + ' people</p> <p>' + new Date() + '</p>'
    );
});


// Routes
app.use('/api/persons', persons);

module.exports = app;