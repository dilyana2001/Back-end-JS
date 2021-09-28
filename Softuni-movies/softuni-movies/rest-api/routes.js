const router = require('express').Router();

const authController = require('./controllers/authController');
const movieController = require('./controllers/movieController');

router.use('/auth', authController);
router.use('/movies', movieController);

module.exports = router;