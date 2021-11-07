const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../devConfig');

router.post('/register', (req, res, next) => {
    //TODO: Check if user exist
    let user = new User(req.body);
    user.save()
        .then(createdUser => {
            // console.log(createdUser);
            res.status(201).json({
                _id: createdUser._id
            });
        })
        .catch(() => next({ status: 403, message: 'Invalid register!', type: 'ERROR' }));


});

router.post('/login', (req, res, next) => {
    User.findOne({ username: req.body.login, password: req.body.password })
        .then(user => {
            // console.log(user);
            let token = jwt.sign({
                _id: user._id,
                username: user.username
            }, config.SECRET, { expiresIn: '2h' });

            res.status(200).json({
                _id: user._id,
                username: user.username,
                token,
            })
        })
        .catch(() => next({ status: 404, message: 'No such user or password!', type: 'ERROR' }));
});

module.exports = router;