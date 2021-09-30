const Cube = require('../models/Cube');
const Accessory = require('../models/Accessory');


async function getAll(query) {
    let products = await Cube.find({}).lean();

    if (query.search) {
        products = products.filter(x => x.name.toLowerCase().includes(query.search.toLowerCase()));
    }

    if (query.from) {
        products = products.filter(x => x.level >= query.from);
    }
    // Cube.find().gte(query.from);

    if (query.to) {
        products = products.filter(x => x.level <= query.to);
    }
    // Cube.find().lte(query.to);

    return products;
}

function getOne(id) {
    return Cube.findById(id).lean();
}

function getOneWithAccessories(id) {
    return Cube.findById(id)
        .populate('accessories')
        .lean();
}

function create(data, userId) {
    let cube = new Cube({...data, creator: userId });
    return cube.save();
}

async function attachAccessory(productId, acessoryId) {
    let product = await Cube.findById(productId);
    let accessory = await Accessory.findById(acessoryId);
    product.accessories.push(accessory);
    return product.save();
}

function updateOne(id, data) {
    return Cube.updateOne({ _id: id }, data);
}

function deleteOne(id) {
    return Cube.deleteOne({ _id: id })
}

module.exports = {
    create,
    getAll,
    getOne,
    getOneWithAccessories,
    attachAccessory,
    updateOne,
    deleteOne,
};