const User = require('../models/User');
const bcrypt = require('bcrypt');
const { SALT_ROUNDS, SECRET } = require('../devConfig');
const jwt = require('jsonwebtoken');
const { MongoCursorInUseError } = require('mongodb');

const register = async({ username, password }) => {
    //TODO: Check is username exists

    let salt = await bcrypt.genSalt(SALT_ROUNDS);
    let hash = await bcrypt.hash(password, salt);


    const user = new User({ username, password: hash });

    return await user.save();
};

const login = async({ username, password }) => {
    let user = await User.findOne({ username });
    if (!user) throw { message: 'User not found!' };

    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw { message: 'Wrong password!' }

    const token = jwt.sign({ _id: user._id, roles: ['admin'] }, SECRET);
    return token;
};

module.exports = {
    register,
    login
}