const { check } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');

exports.getCategoryValidator = [
  check('id').isMongoId().withMessage('رقم تصنيف خاطئ'),
  validatorMiddleware,
];

exports.createCategoryValidator = [
  check('catName')
    .notEmpty()
    .withMessage('إسم التصنيف مطلوب')
    .isLength({ min: 2 })
    .withMessage('إسم التصنيف قصير للغاية')
    .isLength({ max: 32 })
    .withMessage('إسم التصنيف طويل للغاية'),
  validatorMiddleware,
];

exports.updateCategoryValidator = [
  check('id').isMongoId().withMessage('رقم تصنيف خاطئ'),
  validatorMiddleware,
];

exports.deleteCategoryValidator = [
  check('id').isMongoId().withMessage('رقم تصنيف خاطئ'),
  validatorMiddleware,
];