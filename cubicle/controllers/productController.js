const { Router } = require('express');

const productService = require('../services/productService')

const router = Router();

router.get('/', (req, res) => {
    res.render('home', { title: 'Cubicle' })
});

router.get('/create', (req, res) => {
    res.render('create', { title: 'Create Cube Page' })
});

router.post('/create', (req, res) => {
    //TODO Validate inputs 

    let data = req.body;
    productService.create(data);

    res.redirect('/')
});

router.get('/details/:productId', (req, res) => {
    console.log(req.method, req.params.productId);
    res.render('details', { title: 'Cubicle' })
});




module.exports = router;