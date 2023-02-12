const express = require("express");
const gameController = require("../controllers/gameController");

const router = express.Router();

router.route("/").get(gameController.findAll).post(gameController.create);
router
  .route("/:id")
  .get(gameController.findOne)
  .put(gameController.update)
  .delete(gameController.delete);

module.exports = router;
