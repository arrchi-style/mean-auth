const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const config = require('../config/database');
const User = require('../models/user');

// Register
router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });


    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to register User' });
        } else {
            res.json({ success: true, msg: 'User registered' });
        }
    })
});

//Authenticate
router.post('/authenticate', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({ success: false, msg: 'User not found' }); //якщо юзера не знайдено в базі даних відправляємо повідомлення 'User not found'
        }
        // Підтвердження паролю
        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn: 604800 //1 weak
                });
                res.json({
                    success: true,
                    token: 'Bearer ' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                });
            } else {
                return res.json({ success: false, msg: 'Wrong password' });
            }
        })
    })
});

//Profile       (Для захисту 2 параметром ставимо перевірку токену)
router.get('/profile', passport.authenticate('jwt', { success: false }), (req, res) => {
    res.send({ user: req.user })
});


router.get('/movies', (req, res) => {
    res.send({ movie: 'Marvel' }, { movie: 'Dedpul' }, { movie: 'Black Panter' })
})

module.exports = router;