const Accessory = require('../models/Accessory');

function create(data) {
    let accessory = new Accessory(data);

    return accessory.save();
}

function getAllWithout(ids) {
    return Accessory.find({ _id: { $nin: ids } }).lean();
}

function getAll() {
    return Accessory.find().lean();
}

module.exports = {
    create,
    getAllWithout,
    getAll,
}