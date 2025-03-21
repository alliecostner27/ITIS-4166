const express = require("express");
const controller = require("../controllers/itemController");
const router = express.Router();

// Route to search items
router.get("/search", controller.searchItems);

// Route to list all items
router.get("/", controller.index);

// Route to show form to create new item
router.get("/new", controller.new);

// Route to create new item
router.post("/", controller.uploadImage, controller.create);

// Route to show single item
router.get("/:id", controller.show);

// Route to show form to edit item
router.get("/:id/edit", controller.edit);

// Route to update item
router.put("/:id", controller.uploadImage, controller.update);

// Route to delete item
router.delete("/:id", controller.delete);

module.exports = router;