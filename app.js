const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// Connect To Database
mongoose.connect(config.database);

// On Connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.database);
});

// On Error Db Connection
mongoose.connection.on('error', (err) => {
    console.log('Database error  ' + err);
});

const app = express();

const users = require('./routes/users');
const movies = require('./routes/movies');


// Port Number
const port = process.env.PORT || 8080; //через неправильно вказаний порт крешилась аплікуха щоб подивитись логи heroku команда 'heroku logs --tail'

//Cors Middleware
app.use(cors());

// Set static Folder
app.use(express.static(path.join(__dirname, 'public')));

//Body Parser Middleware
app.use(bodyParser.json());

// Passport Middlewere
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// User Route
app.use('/users', users);

// Movie Route
app.use('/movies', movies);

// Index Route
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});


// Start Server
app.listen(port, () => {
    console.log('Server started on port ' + port);
})