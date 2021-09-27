const express = require('express');
const fs = require('fs');
const handlebars = require('express-handlebars');

require('./config/db');
const catController = require('./controllers/catController.js');
const createCat = require('./services/createCat.js');
const Cat = require('./modules/Cat');

const app = express();
const port = 5000;

app.engine('hbs', handlebars({
    extname: 'hbs'
}));
app.set('view engine', 'hbs');

app.use(express.static('./public'));

// app.use(requestLogger); //application level

// app.use('/cats', requestLogger); // route level
// app.use('/cats', requestLogger, catController); //controller level

app.use('/cats', catController);



app.get('/', (req, res) => {

    //create relation data
    // createCat('Macka', 'Dilyana')
    Cat.find({ name: 'Macka' })
        .populate('owner')
        .then(cat => {
            console.log(cat);
            let name = 'Macka';
            res.render('home', { name });
        })

    //render with handlebars


    //custum HTML response
    // let fullpath = path.join(__dirname, '/views/home/index.html');
    // let fullpath = path.resolve(__dirname, './views/home/index.html');
    // res.sendFile(fullpath)

});

app.get('/add-breed', (req, res) => {

    res.render('addBreed')


    // res.header({
    //     'Content-Type': 'text/html'
    // });

    // res.write('<h1>Add Breed</h1>');
    // res.end();
});

app.get('/add-cat/:catName?', (req, res) => {
    let breeds = [
        { name: 'Persian' },
        { name: 'Angora' },
        { name: 'Street Cat' },
        { name: 'Tiger' },
    ]
    res.render('addCat', {
        title: '<h1>Modified Add Cat</h1>',
        name: req.params.catName,
        breeds
    });

    // res.header({
    //     'Content-Type': 'text/html'
    // });

    // res.write('<h1>Add Breed</h1>');
    // res.end();
});

app.get('/download', (req, res) => {
    // res.header({
    // 'Content-Type': 'text/html'
    // 'Content-Disposition': 'attachment; filename="cute-cat.jpg' //2nd
    // });

    //1st 
    res.download('./content/images/cute.jpg')

    //     //2nd
    // let imageStream = fs.createReadStream('./content/images/cute.jpg');
    // imageStream.pipe(res)

    // res.end();
});

app.get('/send-file', (req, res) => {
    res.sendFile('./content/images/cute.jpg', {
        root: __dirname
    });
});

app.get(/.*cat.*/i, (req, res) => {
    res.write('Cat Detected!!!');
    res.end()
});

app.get('/data', (req, res) => {
    res.json({ name: 'Navcho', age: 6 })
});





app.listen(port, () => console.log(`Server is running on port ${port}...`));