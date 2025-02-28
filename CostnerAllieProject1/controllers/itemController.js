//import item model
const model = require("../models/item");

exports.index = (req, res) => {
  let items = model.find();
  res.render("./item/index", { items });
};

exports.login = (req, res) => {
  res.render("login");
};

exports.signup = (req, res) => {
  res.render("signup"); 
};

//new: GET /items/new
exports.new = (req, res) => {
  let item = req.body;
  model.save(item);
  res.redirect("/items");
};

//create: POST /items
exports.create = (req, res) => {
  res.send("create a new item");
};

//show: GET /items/:id
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

//edit: GET /items/:id/edit
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

//update: PUT /items/:id
exports.update = (req, res, next) => {
  let item = req.body;
  let id = req.params.id;

  if (model.updateById(id, item)) {
    res.redirect("/items/" + id);
  } else {
      let err = new Error("Cannot find item with id " + id);
      err.status = 404;
      next(err);
  }
};

//delete: DELETE /items/:id
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
