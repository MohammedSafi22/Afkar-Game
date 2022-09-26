const express = require("express");
const multer = require('multer');

const upload = multer({ dest: 'uploads/avg' })

const {addPoints} = require("../services/avarageServices")

const router = express.Router();

router.route("/addPoints").post(upload.any(),addPoints);

module.exports = router;