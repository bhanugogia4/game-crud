require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const gameRouter = require("./routes/gameRoute");

const app = express();

app.use(morgan("tiny"));

app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to the Database successfully");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/game", gameRouter);

app.get("/", (req, res) => {
  res.send("All goood!!");
});

app.all("*", (req, res, next) => {
  res.status(404).send(`Can't find ${req.originalUrl} on this server!`);
  next(err);
});

app.use((err, req, res, next) => {
  let message = err.message;
  let statusCode = 500;

  if (err.name === "ValidationError") {
    statusCode = 400;
  }

  if (err.code === 11000) {
    const value = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
    message = `A game with name/url: ${value} already exists!`;
    statusCode = 400;
  }

  res.status(statusCode).json({
    status: "error",
    message,
  });
});

app.listen(8080, () => {
  console.log("Server listening to the requests");
});
