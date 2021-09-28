const { Router } = require('express');
const productHelpers = require('../controllers/helpers/productHelpers');
const accessoryService = require('../services/accessoryService')


const router = Router();

router.get('/create', (req, res) => {
    res.render('createAccessory')
})


router.post('/create', productHelpers.validateProduct, (req, res) => {
    accessoryService.create(req.body)
        .then(() => res.redirect('/'))
        .catch(() => res.status(500).end());
})

module.exports = router;