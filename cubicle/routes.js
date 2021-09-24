const { Router } = require('express');

const productController = require('./controllers/productController');
const aboutController = require('./controllers/aboutController');

const router = Router();

router.use('/', productController);
router.use('/about', aboutController);
router.use('*', (req, res) => {
    res.render('404', { title: 'Page Not Found' })
})

module.exports = options => router;