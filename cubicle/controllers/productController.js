const { Router } = require('express');

const isAuthenticated = require('../middlewares/isAuthenticated');
const isGuest = require('../middlewares/isGuest');

const productService = require('../services/productService');
const accessoryService = require('../services/accessoryService');
const productHelpers = require('../controllers/helpers/productHelpers');

const router = Router();

router.get('/', (req, res) => {
    productService.getAll(req.query)
        .then(products => res.render('home', { title: 'Cubicle', products }))
        .catch(() => res.status(500).end());
});

router.get('/create', isAuthenticated, (req, res) => res.render('create', { title: 'Create Cube Page' }));

router.post('/create', isAuthenticated, productHelpers.validateProduct, (req, res) => {
    productService.create(req.body, req.user._id)
        .then(() => res.redirect('/'))
        .catch(() => res.status(500).end());
});

router.get('/details/:productId', (req, res) => {
    productService.getOneWithAccessories(req.params.productId)
        .then(product => {
            let isAuthorizated = false;
            if (req.user._id == product.creator) isAuthorizated = true;
            res.render('details', { title: 'Cubicle', product, isAuthorizated });
        })
        .catch(() => res.status(500).end());
});

router.get('/:productId/attach', isAuthenticated, async(req, res) => {
    let product = await productService.getOne(req.params.productId);
    let accessories = await accessoryService.getAllWithout(product.accessories);
    res.render('attachAccessory', { title: 'Attach Accessory', product, accessories });
});

router.post('/:productId/attach', isAuthenticated, (req, res) => {
    productService.attachAccessory(req.params.productId, req.body.accessory)
        .then(() => res.redirect(`/details/${req.params.productId}`))
        .catch(() => res.status(500).end());

});

router.get('/:productId/edit', isAuthenticated, (req, res) => {
    productService.getOne(req.params.productId)
        .then(product => res.render('editCube', ({ title: 'Edit Cube Page' }, product)))
        .catch(() => res.status(500).end());
});

router.post('/:productId/edit', isAuthenticated, productHelpers.validateProduct, (req, res) => {
    productService.getOne(req.params.productId)
        .then(product => {
            if (product.creator != req.user._id) return res.redirect('/');
            return productService.updateOne(req.params.productId, req.body);
        })
        .then(() => res.redirect('/'))
        .catch(() => res.status(500).end());
});


router.get('/:productId/delete', isAuthenticated, (req, res) => {
    productService.getOne(req.params.productId)
        .then(product => res.render('deleteCubе', ({ title: 'Delete Cube Page', product })))
        .catch(() => res.status(500).end());
});

router.post('/:productId/delete', isAuthenticated, (req, res) => {
    productService.getOne(req.params.productId)
        .then(product => {
            if (product.creator != req.user._id) return res.redirect('/');
            return productService.deleteOne(req.params.productId);
        })
        .then(() => res.redirect('/'))
        .catch(() => res.status(500).end());
});


module.exports = router;