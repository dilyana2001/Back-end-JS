const express = require('express');
const router = express.Router();
const requestLogger = require('../middlewares/requestLoggerMiddleware.js')

router.get('/navcho', (req, res) => {
    res.write(`
    <h1>Navcho's Rulez!</h1>
    `)
    res.end();
})

router.get('/:catName', requestLogger, (req, res) => {
    console.log(`with action level middleware`);
    if (req.params.catName == 'navuhodonosor') {
        return res.redirect('/cats/navcho');
    }

    res.header({
        'Content-Type': 'text/html'
    });
    res.write(`
    <h1>${req.params.catName} Rules!</h1>
    `);
    res.end();
});



module.exports = router;