const express = require("express");
const multer = require('multer');

const {
  getGames,
  getGame,
  // createGame,
  addGame,
  updateGame,
  deleteGame,
} = require("../services/gameService");
const {
  getGameValidator,
  createGameValidator,
  updateGameValidator,
  deleteGameValidator,
} = require("../utils/validators/gameValidator");

const authService = require("../services/authService");
const upload = multer({ dest: 'uploads/games' })


const router = express.Router();

router
.route("/")
.get(getGames)
.post(
  upload.any(),
  authService.protect,
  authService.allowedTo('admin'),
  createGameValidator,
  addGame,
  );

router
  .route("/:id")
  .get(getGameValidator, getGame)
  .put(
    upload.any(),
    authService.protect,
    authService.allowedTo('admin'),
    updateGameValidator,
    updateGame)
  .delete(
    authService.protect,
    authService.allowedTo('admin'),
    deleteGameValidator,
    deleteGame);

module.exports = router;
