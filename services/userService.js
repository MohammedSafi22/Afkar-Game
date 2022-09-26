const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const factory = require("./handlesFactory");
const bcrypt = require("bcryptjs");
const ApiError = require("../utils/apiError");
const createToken = require("../utils/createToken");

exports.getUsers = factory.getAll(User);

exports.getUser = factory.getOne(User);

exports.createUser = factory.createOne(User);

exports.deleteUser = factory.deleteOne(User);

exports.updateUser = asyncHandler(async (req, res, next) => {
  const document = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      childName: req.body.childName,
    },
    { new: true }
  );
  if (!document) {
    return next(new ApiError("No document for this id", 404));
  }
  res.status(200).json({ data: document });
});

exports.changeUserPassword = asyncHandler(async (req, res, next) => {
  const document = await User.findByIdAndUpdate(
    req.params.id,
    {
      password: await bcrypt.hash(req.body.password, 12),
      passwordChangedAt: Date.now(),
    },
    { new: true }
  );
  if (!document) {
    return next(new ApiError("No document for this id", 404));
  }
  res.status(200).json({ data: document });
});

exports.getLoggedUserData = asyncHandler(async (req, res, next) => {
  req.params.id = req.user._id;
  next();
});

exports.updateLoggedUserPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      password: await bcrypt.hash(req.body.password, 12),
      passwordChangedAt: Date.now(),
    },
    {
      new: true,
    }
  );
  const token = createToken(user._id);

  res.status(200).json({ data: user, token });
});

exports.updateLoggedUserData = asyncHandler(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      childName: req.body.childName,
    },
    { new: true }
  );
  res.status(200).json({ data: updatedUser });
});

exports.deleteLoggedUserData = asyncHandler(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user._id, { active: false });

  res.status(204).json({ status: "Success" });
});

exports.addPointsToGame = asyncHandler(async (req, res, next) => {
  const user_id = req.body.user_id;
  const game_id = req.body.game_id;
  let points = req.body.points;
  let user_points = 0;
  let user = await User.find({ _id: user_id, "games._id": game_id });
  user[0].games.forEach((g) => {
    if (g._id == game_id) {
      user_points = g.points;
    }
  });
  points = points + user_points;
  // const points = user.games.points
  // console.log(user);
  // return res.send(user);
  user = await User.updateOne(
    { _id: user_id, "games._id": game_id },
    {
      $set: { "games.$.points": points },
    }
  );
  return res.send({ message: "success" });
});

exports.addGameToUser = asyncHandler(async (req, res, next) => {
  const user_id = req.body.user_id;
  const game_id = req.body.game_id;
  const category_id = req.body.category_id;

  // let user = await User.findOne({ _id: user_id });
  // user.games.forEach((g) => {
  //   if (g._id == game_id) {
  //     user.games.push = { id: game_id, points: 0 };
  //     // return res.send({ message: "success" });
  //   }
  // });
  // await user.save();
  await User.updateOne(
    { _id: user_id , "games.id": { $ne : game_id }},
    {
      $push: { games: { id: game_id, category_id: category_id, points: 0 } },
    }
  );
  return res.send({ message: "success" });
});
