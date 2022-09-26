const express = require("express");
const multer = require('multer');

const {
  getCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../services/categoryService");
const {
  getCategoryValidator,
  createCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require("../utils/validators/categoryValidator");

const authService = require('../services/authService');
const upload = multer({ dest: 'uploads/categories' })

const router = express.Router();

router
  .route("/")
  .get(getCategories)
  .post(
    upload.any(),
    authService.protect,
    authService.allowedTo('admin'),
    createCategoryValidator,
    createCategory
  );
router
  .route("/:id")
  .get(getCategoryValidator, getCategory)
  .put(
    upload.any(),
    authService.protect,
    authService.allowedTo('admin'),
    updateCategoryValidator, updateCategory)
  .delete(
    authService.protect,
    authService.allowedTo('admin'),
    deleteCategoryValidator,
    deleteCategory);
    
module.exports = router;
