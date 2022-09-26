const express = require('express');
const multer = require('multer');

const {
  signupValidator,
  loginValidator
} = require('../utils/validators/authValidator');

const {
  signup,
  login,
  forgotPassword,
  verifyPassResetCode,
  resetPassword
} = require('../services/authService');

const upload = multer({ dest: 'uploads/auth' })


const router = express.Router();

router.post('/signup',upload.any(), signupValidator, signup);
router.post('/login',upload.any(),loginValidator,login);
router.post('/forgotPassword',upload.any(), forgotPassword);
router.post('/verifyPassResetCode',upload.any(), verifyPassResetCode);
router.put('/resetPassword',upload.any(), resetPassword);


module.exports = router;