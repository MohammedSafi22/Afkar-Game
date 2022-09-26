const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const Category = require('../../models/categoryModel')

exports.createGameValidator = [
  check("name").notEmpty().withMessage("اسم اللعبة مطلوب"),
  check("scores")
    .notEmpty()
    .withMessage("الدرجات مطلوبة")
    .isNumeric()
    .withMessage("الدرجات يجب ان تكون أرقاما"),
  check("points")
    .notEmpty()
    .withMessage("النقاط مطلوبة")
    .isNumeric()
    .withMessage("النقاط يجب ان تكون أرقاما"),
  check("starsNo")
    .notEmpty()
    .withMessage("عدد النجوم مطلوبة")
    .isNumeric()
    .withMessage("عدد النجوم يجب ان تكون رقما"),
  check("category")
    .notEmpty()
    .withMessage("اللعبة يجب أن تكون ضمن تصنيف محدد")
    .isMongoId()
    .withMessage("تصنيف خاطئ أو غير موجود")
    .custom((categoryId)=> Category.findById(categoryId).then((category)=>{
      if(!category){
        return Promise.reject(
          new Error('لا يوجد تصنيف')
        )
      }
    })),
  validatorMiddleware,
];
exports.getGameValidator = [
  check("id").isMongoId().withMessage("رقم اللعبة خاطئ"),
  validatorMiddleware,
];
exports.updateGameValidator = [
  check("id").isMongoId().withMessage("رقم اللعبة خاطئ"),
  validatorMiddleware,
];
exports.deleteGameValidator = [
  check("id").isMongoId().withMessage("رقم اللعبة خاطئ"),
  validatorMiddleware,
];
