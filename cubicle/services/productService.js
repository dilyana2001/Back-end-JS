const Cube = require('../models/Cube');
const uniqid = require('uniqid');
const fs = require('fs');
let products = require('../config/products.json');
const path = require('path');

function getAll() {
    return products;
}

function getOne(id) {
    return products.find(x => x.id == id);
}

function create(data) {
    let cube = new Cube(
        uniqid(),
        data.name,
        data.description,
        data.imageUrl,
        data.difficultyLevel
    );

    products.push(cube);

    fs.writeFile(path.join(__dirname, '../config/products.json'), JSON.stringify(products), (err) => {
        if (err) {
            return console.log(err);
        }
    });
}

module.exports = {
    create,
    getAll,
    getOne
};