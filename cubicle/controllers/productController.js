const { Router } = require('express');
const productService = require('../services/productService');
const productHelpers = require('../controllers/helpers/productHelpers');
const router = Router();

router.get('/', (req, res) => {
    productService.getAll(req.query)
        .then(products => res.render('home', { title: 'Cubicle', products }))
        .catch(() => res.status(500).end());
});

router.get('/create', (req, res) => {
    res.render('create', { title: 'Create Cube Page' });
});

router.post('/create', productHelpers.validateProduct, (req, res) => {
    productService.create(req.body)
        .then(() => res.redirect('/'))
        .catch(() => res.status(500).end());
});

router.get('/details/:productId', (req, res) => {
    productService.getOne(req.params.productId)
        .then(product => {
            console.log(req.method, req.params.productId);
            res.render('details', { title: 'Cubicle', product })
        })
        .catch(() => res.status(500).end());
});


// router.get('/create/accessory', (req, res) => {
//     res.render('create-accessory')
// })

// router.get('/attach/accessory/:id', (req, res) => {
//     res.render('attachAccessory')
// })


module.exports = router;