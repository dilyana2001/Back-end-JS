const { Router } = require('express');
const productService = require('../services/productService');
const accessoryService = require('../services/accessoryService');
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
    productService.getOneWithAccessories(req.params.productId)
        .then(product => {
            console.log(req.method, req.params.productId);
            res.render('details', { title: 'Cubicle', product })
        })
        .catch(() => res.status(500).end());
});

router.get('/:productId/attach', async(req, res) => {
    let product = await productService.getOne(req.params.productId);
    let accessories = await accessoryService.getAllWithout(product.accessories)

    console.log(req.method, req.params.productId);
    res.render('attachAccessory', { title: 'Attach Accessory', product, accessories })
});

router.post('/:productId/attach', (req, res) => {
    productService.attachAccessory(req.params.productId, req.body.accessory)
        .then(() => res.redirect(`/details/${req.params.productId}/`))
});


module.exports = router;