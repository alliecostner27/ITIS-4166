const express = require("express");
const controller = require("../controllers/itemController");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function(req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  }
});

router.get("/search", controller.searchItems);

router.get("/", controller.index);
router.get("/new", controller.new);
router.post(
  "/",
  upload.single("image"),
  (req, res, next) => {
    controller.create(req, res, next);
  },
  (error, req, res, next) => {
    res.render("items/new", {
      errors: { image: { message: error.message } },
      item: req.body
    });
  }
);
router.get("/:id", controller.show);
router.get("/:id/edit", controller.edit);
router.put(
  "/:id",
  upload.single("image"),
  (req, res, next) => {
    controller.update(req, res, next);
  },
  (error, req, res, next) => {
    res.render("items/edit", {
      errors: { image: { message: error.message } },
      item: req.body
    });
  }
);
router.delete("/:id", controller.delete);


module.exports = router;
