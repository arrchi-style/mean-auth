const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const config = require('../config/database');
const User = require('../models/user');


router.get('/movies', (req, res) => {
    res.send([{
        movie: 'Marvel',
        price: 100
    }])
})

module.exports = router;