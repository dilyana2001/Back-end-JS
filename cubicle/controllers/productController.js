const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.render('home', { title: 'Cubicle' })
});
router.get('/create', (req, res) => {
    res.render('create', { title: 'Create Cube Page' })
});
router.get('/details/:productId', (req, res) => {
    console.log(req.params.productId);
    res.render('details', { title: 'Cubicle' })
})


module.exports = router;