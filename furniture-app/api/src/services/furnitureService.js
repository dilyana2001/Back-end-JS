const Furniture = require('../models/Furniture');

exports.getAll = () => Furniture.find();

exports.getOne = (id) => Furniture.findById(id);

exports.getOwn = (userId) => Furniture.find({_ownerId: userId});

exports.create = (furnitureData) => Furniture.create(furnitureData);

exports.update = (id, furnitureData) => Furniture.findByIdAndUpdate(id, furnitureData);

exports.delete = (id) => Furniture.findByIdAndDelete(id);