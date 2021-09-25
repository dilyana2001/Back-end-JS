const { Router } = require('express');

const productService = require('../services/productService');
const productHelpers = require('../controllers/helpers/productHelpers')

const router = Router();

router.get('/', (req, res) => {
    let products = productService.getAll(req.query);
    res.render('home', { title: 'Cubicle', products });
});

router.get('/create', (req, res) => {
    res.render('create', { title: 'Create Cube Page' });
});

router.post('/create', productHelpers.validateProduct, (req, res) => {

    // productService.create(req.body, (err) => {
    //     if (err) {
    //         return res.status(500).end();
    //     }
    //     res.redirect('/');
    // });\

    productService.create(req.body)
        .then(() => res.redirect('/'))
        .catch(() => res.status(500).end());
});

router.get('/details/:productId', (req, res) => {
    let product = productService.getOne(req.params.productId)
    console.log(req.method, req.params.productId);
    res.render('details', { title: 'Cubicle', product })
});




module.exports = router;