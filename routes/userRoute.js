const express = require("express");
const multer = require('multer');

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  changeUserPassword,
  getLoggedUserData,
  updateLoggedUserPassword,
  updateLoggedUserData,
  deleteLoggedUserData,
  addPointsToGame,
  addGameToUser
} = require("../services/userService");
 const {
  getUserValidator,
  createUserValidator,
  updateUserValidator,
  deleteUserValidator,
  changeUserPasswordValidator,
  
 } = require("../utils/validators/userValidator");

 const authService = require("../services/authService");
 const upload = multer({ dest: 'uploads/users' })


const router = express.Router();

router.get('/getMe',authService.protect,getLoggedUserData,getUser);
router.put('/changeMyPassword',authService.protect,updateLoggedUserPassword);
router.put('/updateMe',authService.protect,updateLoggedUserData);
router.delete('/deleteMe',authService.protect,deleteLoggedUserData);
router.route('/addPoints').post(authService.protect,addPointsToGame);
router.route('/addGameToUser').post(authService.protect, addGameToUser);

router.put('/changePassword/:id',upload.any(),changeUserPasswordValidator,changeUserPassword);

router.route("/")
  .get(
    authService.protect,
    authService.allowedTo('admin'),
    getUsers)
  .post(
    upload.any(),
    authService.protect,
    authService.allowedTo('admin'),
    createUserValidator,
    createUser);

router
  .route("/:id")
  .get(
    authService.protect,
    authService.allowedTo('admin'),
    getUserValidator,
    getUser)
  .put(
      upload.any(),
       authService.protect,
       authService.allowedTo('admin'),
       updateUserValidator,
       updateUser)
  .delete(authService.protect,
          authService.allowedTo('admin'),
          deleteUserValidator,
          deleteUser);

module.exports = router;
