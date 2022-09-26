const Game = require("../models/gameModel");
const Category = require("../models/categoryModel");
const factory = require("./handlesFactory");

exports.getGames = factory.getAll(Game, "Game");

exports.getGame = factory.getOne(Game);

exports.createGame = factory.createOne();

exports.addGame = async (req, res) => {
  // const game = Game({
  //   name:req.body.name,
  //   scores: req.body.scores,
  //   points: req.body.points,
  //   starsNo: req.body.starsNo,
  //   category: req.body.category,
  // });

  const game = await Game(req.body);

  game.save(async (err, game) => {
    console.log(game);
    if (err) {
      return res.status(500).send(err);
    }
    const category = await Category.findOne({ _id: game.category });
    console.log(category);
    const total = req.body.points + category.categoryTotal;
    const totalGames = 1 + category.games.length;
    const average = total / totalGames;
    await Category.updateOne(
      { _id: game.category },
      {
        $push: { games: game._id },
        $set: { categoryAverage: Math.ceil(average), categoryTotal: total, totalGames: totalGames}
      },
      { new: true }
    );
    res.status(201).json({ data: game });
  });
};

exports.updateGame = factory.updateOne(Game);

exports.deleteGame = factory.deleteOne(Game);
