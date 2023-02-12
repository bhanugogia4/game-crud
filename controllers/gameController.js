const mongoose = require("mongoose");
const Game = require("../models/gameModel");

const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

exports.create = catchAsync(async (req, res, next) => {
  await Game.create(req.body).then((doc) => {
    res.status(201).json({
      status: "success",
      game: doc,
    });
  });
});

exports.findAll = catchAsync(async (req, res, next) => {
  await Game.find()
    .then((doc) => {
      res.send(doc);
    })
    .catch((err) => {
      res.status(500).send({
        status: "error",
        message: "Some error occurred while retrieving games.",
      });
    });
});

exports.findOne = catchAsync(async (req, res, next) => {
  const id = mongoose.Types.ObjectId(req.params.id);

  await Game.findById(id).then((doc) => {
    if (!doc) res.status(404).send({ message: "Not found Game with id " + id });
    else res.send(doc);
  });
});

exports.update = catchAsync(async (req, res, next) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = mongoose.Types.ObjectId(req.params.id);

  await Game.findByIdAndUpdate(id, req.body)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Game with id=${id}. Maybe Game was not found!`,
        });
      } else {
        if (req.body.publishedDate) {
          return res.status(400).send({
            message: "Published Date cannot be updated!",
          });
        }
        res.send({ message: "Game was updated successfully." });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error updating Game with id=${id}`,
      });
    });
});

exports.delete = catchAsync(async (req, res, next) => {
  const id = mongoose.Types.ObjectId(req.params.id);

  Game.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Game with id=${id}. Maybe Tutorial was not found!`,
        });
      } else {
        res.send({
          message: "Game was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Game with id=" + id,
      });
    });
});
