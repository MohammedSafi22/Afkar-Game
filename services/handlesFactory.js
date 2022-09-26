const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures");
const Game = require("../models/gameModel");
const Category = require("../models/categoryModel");
const User = require("../models/userModel");

exports.deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findByIdAndDelete(id);

    if (!document) {
      return next(new ApiError(`No document for this id ${id}`, 404));
    }
    res.status(204).send();
  });

exports.updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!document) {
      return next(
        new ApiError(`No document for this id ${req.params.id}`, 404)
      );
    }
    res.status(200).json({ data: document });
  });

exports.createOne = (Model) =>
  asyncHandler(async (req, res) => {
    const newDoc = await Model.create(req.body);
    res.status(201).json({ data: newDoc });
  });

exports.getOne = (Model, populateOpt) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    let query;
    if (Model === Category) {
      query = Model.findById(id).populate("games", { name: 1, category: 0 });
    } else {
      query = Model.findById(id);
    }
    // if(populateOpt){
    //   console.log("yes pop");
    //    query= query.populate(populateOpt);
    // }
    const document = await query;
    if (Model === User) {
      const allCategories = await Category.find({}, {_id: 1});
      // return res.json(allCategories[0]._id);
      const games = document.games;
      const categories = [];
      for (let i = 0; i < allCategories.length; i++) {
        let average = 0;
        for (let j = 0; j < games.length; j++) {
          if (games[j].category_id == allCategories[i]._id) {
            average = average + games[j].points;
            console.log(games[j].points);
          }
        }
        categories.push({ id: allCategories[i]._id, average: average });
      }
      document.categories = categories;
    }
    if (!document) {
      return next(new ApiError(`No document for this id ${id}`, 404));
    }
    
    res.status(200).json({ data: document });
  });

exports.getAll = (Model, modelName = "") =>
  asyncHandler(async (req, res) => {
    let filter = {};
    if (req.filterObj) {
      filter = req.filterObj;
    }
    // Build query
    const documentsCounts = await Model.countDocuments();
    const apiFeatures = new ApiFeatures(Model.find(filter), req.query)
      .paginate(documentsCounts)
      .filter()
      .search(modelName)
      .limitFields()
      .sort();

    // Execute query
    const { mongooseQuery, paginationResult } = apiFeatures;
    const documents = await mongooseQuery;

    res
      .status(200)
      .json({ results: documents.length, paginationResult, data: documents });
  });
