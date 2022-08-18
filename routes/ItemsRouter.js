const express = require("express");
const router = express.Router();
const itemsController = require("../controllers/ItemsController");

router.get("/", itemsController.getAllItems);
router.get("/:id", itemsController.getItems);
router.delete("/:id", itemsController.deleteItems);
router.post("/", itemsController.CreateItems);

module.exports = router;
