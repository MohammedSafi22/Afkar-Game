const Category = require('../models/categoryModel');
const factory = require('./handlesFactory');

exports.getCategories = factory.getAll(Category);

exports.getCategory = factory.getOne(Category,"games");

exports.createCategory = factory.createOne(Category);

exports.updateCategory = factory.updateOne(Category);

exports.deleteCategory = factory.deleteOne(Category);