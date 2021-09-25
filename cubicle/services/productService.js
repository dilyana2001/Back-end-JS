const Cube = require('../models/Cube');
const uniqid = require('uniqid');
const fs = require('fs/promises');
let products = require('../config/products.json');
const path = require('path');

function getAll(query) {
    let result = products;
    if (query.search) {
        result = result.filter(x => x.name.toLowerCase().includes(query.search.toLowerCase()));
    }
    if (query.from) {
        result = result.filter(x => x.level >= query.from);
    }
    if (query.to) {
        result = result.filter(x => x.level <= query.to);
    }
    return result;
}

function getOne(id) {
    return products.find(x => x.id == id);
}

function create(data, callback) {
    let cube = new Cube(
        uniqid(),
        data.name,
        data.description,
        data.imageUrl,
        data.difficultyLevel
    );

    products.push(cube);

    // fs.writeFile(path.join(__dirname, '../config/products.json'), 
    // JSON.stringify(products),
    // callback
    // );

    return fs.writeFile(
        path.join(__dirname, '../config/products.json'),
        JSON.stringify(products)
    )
}

module.exports = {
    create,
    getAll,
    getOne
};