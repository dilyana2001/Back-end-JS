const router = require('express').Router();
const authService = require('../services/authService');
const { COOKIE_NAME } = require('../devConfig');

const isAuthenticated = require('../middlewares/isAuthenticated');
const isGuest = require('../middlewares/isGuest');

router.get('/login', isGuest, (req, res) => res.render('login', { title: 'Login Page' }));

router.post('/login', isGuest, async(req, res) => {
    const { username, password } = req.body;

    try {
        let token = await authService.login({ username, password });
        res.cookie(COOKIE_NAME, token);
        res.redirect('/');
    } catch (error) {
        res.render('login', { error })
    }
});

router.get('/register', isGuest, (req, res) => res.render('register', { title: 'Register Page' }));

router.post('/register', isGuest, async(req, res) => {
    const { username, password, repeatPassword } = req.body;

    if (password !== repeatPassword) {
        return res.render('register', { message: 'Password missmatch!' });
    }

    try {
        await authService.register({ username, password });
        res.redirect('/auth/login');
    } catch (error) {
        res.render('register', { error });
    }
});


router.get('/logout', isAuthenticated, (req, res) => {
    res.clearCookie(COOKIE_NAME);
    res.redirect('/');
})

module.exports = router;