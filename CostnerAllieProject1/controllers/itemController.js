//import item model
const model = require("../models/item");


exports.index = (req, res) => {
  let items = model.find();
  res.render('./item/index', { items });
};

exports.login = (req, res) => {
  res.render('login');
};


exports.signup = (req, res) => {
  res.render('signup');  // This will render signUp.ejs
};


//new: GET /items/new
exports.new = (req, res) => {
  res.render('./item/new');
};

//create: POST /items
exports.create =(req, res) => {
  res.send('create a new item');
};

//show: GET /items/:id
exports.show = (req, res, next) => {
  let id = req.params.id;
  let item = model.findById(id);

  if (item) {
    res.render('./item/show', { item });
  } else {
    res.status(404).send('Item not found');
  }
};

//edit: GET /items/:id/edit
exports.edit = (req, res, next) => {
  let id = req.params.id;
  let item = model.findById(id);

  if (item) {
    res.render("./item/edit", { story });
  } else {
      let err = new Error("Cannot find item with id " + id);
      err.status = 404;
      next(err);
  }
};

//update: PUT /items/:id
exports.update = (req, res) => {
  res.send('update item with id ' + req.params.id);
};

//delete: DELETE /items/:id
exports.delete = (req, res, next) => {
  let id = req.params.id;
  if (model.deleteById(id)){
    res.redirect("/items");
  } else {
    let err = new Error("Cannot find item with id " + id);
    err.status = 404;
    next(err);
  }
};

