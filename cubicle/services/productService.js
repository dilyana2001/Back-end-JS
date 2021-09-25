const Cube = require('../models/Cube');
const uniqid = require('uniqid');
const fs = require('fs');
let products = require('../config/products.json')

function getAll() {
    return products;
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
    fs.writeFile(`${__dirname}/../config/products.json`, JSON.stringify(products), (err) => {
        if (err) {
            return console.log(err);
        }
    });
}

module.exports = {
    create,
    getAll
};