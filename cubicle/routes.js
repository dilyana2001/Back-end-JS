const { Router } = require('express');

const productController = require('./controllers/productController');
const accessoryController = require('./controllers/accessoryController');
const aboutController = require('./controllers/aboutController');
const authController = require('./controllers/authController');

const router = Router();

router.use('/auth', authController);
router.use('/accessories', accessoryController);
router.use('/about', aboutController);
router.use('/', productController);

router.use('*', (req, res) => res.render('404', { title: 'Page Not Found' }));

module.exports = options => router;