const { Router } = require('express');

const productService = require('../services/productService');
const productHelpers = require('../controllers/helpers/productHelpers')

const router = Router();

router.get('/', (req, res) => {
    let products = productService.getAll();
    res.render('home', { title: 'Cubicle', products })
});

router.get('/create', (req, res) => {
    res.render('create', { title: 'Create Cube Page' })
});

router.post('/create', productHelpers.validateProduct, (req, res) => {
    //TODO Validate inputs 

    let data = req.body;
    productService.create(data);

    res.redirect('/')
});

router.get('/details/:productId', (req, res) => {
    let product = productService.getOne(req.params.productId)
    console.log(req.method, req.params.productId);
    res.render('details', { title: 'Cubicle', product })
});




module.exports = router;