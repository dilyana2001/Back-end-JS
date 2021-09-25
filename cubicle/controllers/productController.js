const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.render('home', { title: 'Cubicle' })
});

router.get('/create', (req, res) => {
    res.render('create', { title: 'Create Cube Page' })
});

router.get('/details/:productId', (req, res) => {
    console.log(req.method, req.params.productId);
    res.render('details', { title: 'Cubicle' })
});

router.post('/create', (req, res) => {
    console.log(req.body);
    res.send('created');
})



module.exports = router;