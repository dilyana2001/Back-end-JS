const jwt = require('jsonwebtoken');
const config = require('../devConfig')

function auth(req, res, next) {
    let authorizationHeader = req.get('Authorization');
    if (authorizationHeader) {
        let token = authorizationHeader.split(' ')[1];
        try {
            let decoded = jwt.verify(token, config.SECRET);
            req.user = decoded;
        } catch (error) {
            console.log('Invalid token!');
        }

    }

    next();
};

function isAuth(req, res, next) {
    if (!req.user) {
        res.status(401).end({ errorData: { message: 'not authorozated' } });
    }
    next();
}


module.exports = {
    auth,
    isAuth
}