const express = require("express");
const router = express.Router();
const itemsController = require("../controllers/ItemsController");

router.get("/", itemsController.getAllItems);
router.post("/", itemsController.CreateItems);

module.exports = router;
