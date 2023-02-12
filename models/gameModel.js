const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GameSchema = new Schema(
  {
    name: {
      type: String,
      required: "Name is required",
      unique: true,
    },
    url: {
      type: String,
      required: "Url is required",
      unique: true,
    },
    author: {
      type: String,
      required: "Author is required",
    },
    publishedDate: {
      type: Date,
      default: Date.now,
      immutable: true,
    },
  },
  { __v: { type: Number, select: false } }
);

const Game = mongoose.model("game", GameSchema);

GameSchema.post("save", function (doc) {
  console.log("I am working!!");
  if (error.name === "MongoError" && error.code === 11000) {
    next(new Error("name must be unique"));
  } else {
    next(error);
  }
});

module.exports = Game;
