const { Router } = require('express');
const productHelpers = require('../controllers/helpers/productHelpers');
const accessoryService = require('../services/accessoryService');

const isAuthenticated = require('../middlewares/isAuthenticated');
const isGuest = require('../middlewares/isGuest');

const router = Router();

router.get('/create', isAuthenticated, (req, res) => {
    res.render('createAccessory');
})


router.post('/create', isAuthenticated, productHelpers.validateProduct, (req, res) => {
    accessoryService.create(req.body)
        .then(() => res.redirect('/'))
        .catch(() => res.status(500).end());
})

module.exports = router;