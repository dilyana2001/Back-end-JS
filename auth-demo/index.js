const express = require('express');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const uniqid = require('uniqid');
const bcrypt = require('bcrypt');
// const bcryptPromise = require('bcrypt-promise');
const jwt = require('jsonwebtoken');


const app = express();

const sessionObject = {};
const session = function(options) {
    return (req, res, next) => {
        if (!req.cookies.id) {
            let cookieId = uniqid();

            sessionObject[cookieId] = {};

            res.cookie('id', cookieId);
        } else {
            let cookieId = req.cookies.id;
            req.session = sessionObject[cookieId];
        }
        next();
    };
}

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(expressSession({
    secret: 'macka',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false
    }
}));

app.get('/login/:username/:password', (req, res) => {
    let plainTextPassword = req.params.password;
    bcrypt.genSalt(9, (err, salt) => {
        if (err) console.log(err);
        bcrypt.hash(plainTextPassword, salt, (err, hash) => {
            if (err) console.log(err);
            req.session.passwordHash = hash;
            console.log(req.session);
            console.log(hash);
        })
    })

    res.send('Ypu have been logged!');
});

app.get('/', (req, res) => {
    res.send(`<h1>Heelloo ${req.session?.username || 'n\\a'}</h1>`)
});

app.get('/session', (req, res) => {
    res.send(req.session)
});

app.get('/login/:password', (req, res) => {
    console.log(req.session);
    bcrypt.compare(req.params.password, req.session.passwordHash, (err, isIdentical) => {
        console.log(isIdentical);
        res.send(isIdentical ? 'Loggin in' : 'Error login');
    })
});

app.get('/token/create', (req, res) => {
    res.send(`
<form action="/token/create" method="POST">
<input type="text" name="username" />
<input type="password" name="password" />
<input type="submit" value="submit"/>
</form>
`)
});

app.post('/token/create', (req, res) => {
    bcrypt.hash(req.body.password, 2, (err, hash) => {
        const payloads = {
            _id: uniqid(),
            usermname: req.body.username,
            password: hash
        }
        const secret = 'mysecretsecret';
        const options = {
            expiresIn: '2d'
        }

        const token = jwt.sign(payloads, secret, options);

        res.cookie('jwt', token);
        // res.json({ token });
        res.redirect('/token/show');
    })
});

app.get('/token/show', (req, res) => {
    let token = req.cookies.jwt;

    let decodedToken = jwt.verify(token, 'mysecretsecret');

    // bcrypt.compare(decodedToken.password,)
    console.log(decodedToken);
    res.send(decodedToken);
});

app.get('/token/login', (req, res) => {
    res.send(`
<form action="/token/login" method="POST">
<input type="text" name="username" />
<input type="password" name="password" />
<input type="submit" value="submit"/>
</form>
`)
});

app.post('/token/login', (req, res) => {
    let token = req.cookies.jwt;

    let decodedToken = jwt.verify(token, 'mysecretsecret');

    if (req.body.username !== decodedToken.username) {
        return res.status(400).send('Not valid')
    }

    bcrypt.compare(req.body.password, decodedToken.password, (err, isIdentical) => {
        console.log(`is or not? ${isIdentical}`);
        if (isIdentical) {
            res.send(`you are logged in ${decodedToken.username}`)
        } else {
            res.status(400).send('Invalid pass')
        }
    })
});


app.listen(5005, () => console.log(`Server is listening 5005...`));