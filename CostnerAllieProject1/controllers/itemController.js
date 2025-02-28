const model = require("../models/item");

// Removed multer setup since we are no longer using it for file storage

exports.index = (req, res) => {
  let items = model.find();
  items.sort((a, b) => a.price - b.price);
  res.render("./item/index", { items });
};

exports.login = (req, res) => {
  res.render("login");
};

exports.signup = (req, res) => {
  res.render("signup");
};

// new: GET /items/new
exports.new = (req, res) => {
  res.render("./item/new"); // Ensures the form page is rendered properly
};

// create: POST /items
exports.create = (req, res, next) => {
  try {
    let newItem = {
      condition: req.body.condition,
      title: req.body.title,
      seller: req.body.seller,
      price: parseFloat(req.body.price), // Ensure price is stored as a number
      details: req.body.details,
      image: req.body.image || "default.jpg", // Use uploaded image URL or default image
    };

    model.save(newItem); // Save the new item
    res.redirect("/items"); // Redirect to items list
  } catch (err) {
    next(err);
  }
};

// show: GET /items/:id
exports.show = (req, res, next) => {
  let id = req.params.id;
  let item = model.findById(id);

  if (item) {
    res.render("./item/show", { item });
  } else {
    let err = new Error("Cannot find item with id " + id);
    err.status = 404;
    next(err);
  }
};

// edit: GET /items/:id/edit
exports.edit = (req, res, next) => {
  let id = req.params.id;
  let item = model.findById(id);
  if (item) {
    res.render("./item/edit", { item });
  } else {
    let err = new Error("Cannot find item with id " + id);
    err.status = 404;
    next(err);
  }
};

// update: PUT /items/:id
exports.update = (req, res, next) => {
  let id = req.params.id;
  let updatedItem = {
    condition: req.body.condition,
    title: req.body.title,
    seller: req.body.seller,
    price: parseFloat(req.body.price),
    details: req.body.details,
    image: req.body.image || req.body.existingImage, // Keep existing image if not updated
  };

  if (model.updateById(id, updatedItem)) {
    res.redirect("/items/" + id);
  } else {
    let err = new Error("Cannot find item with id " + id);
    err.status = 404;
    next(err);
  }
};

// delete: DELETE /items/:id
exports.delete = (req, res, next) => {
  let id = req.params.id;
  if (model.deleteById(id)) {
    res.redirect("/items");
  } else {
    let err = new Error("Cannot find item with id " + id);
    err.status = 404;
    next(err);
  }
};

// Removed multer upload middleware as it's no longer used
