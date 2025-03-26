const model = require("../models/item");
const multer = require("multer");
const path = require("path");

// Set storage engine for multer
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req, file, cb){
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Init upload
const upload = multer({
  storage: storage,
  limits: {fileSize: 1000000},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single('image');

// Check file type
function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: Images Only!');
  }
}

exports.uploadImage = (req, res, next) => {
  upload(req, res, (err) => {
    if(err){
      res.render('index', {
        msg: err
      });
    } else {
      if(req.file == undefined){
        res.render('index', {
          msg: 'Error: No File Selected!'
        });
      } else {
        next();
      }
    }
  });
};

exports.index = (req, res, next) => {
  //send all the items
  model.find().sort({ price: 1 })
  .then(items => res.render("./item/index", { items }))
  .catch(err => next(err));
};

exports.login = (req, res) => {
  res.render("login");
};

exports.signup = (req, res) => {
  res.render("signup");
};

exports.new = (req, res) => {
  res.render("./item/new"); 
};

// create: POST /items
exports.create = (req, res, next) => {
  let item = new model({
    condition: req.body.condition,
    title: req.body.title,
    seller: req.body.seller,
    price: parseFloat(req.body.price), 
    details: req.body.details,
    image: req.file ? req.file.filename : "default.jpg", 
  });
  item.save() //insert the document to the database
  .then(item => res.redirect("/items"))
  .catch(err => next(err));
}

// show: GET /items/:id
exports.show = (req, res, next) => {
  let id = req.params.id;
  if(!id.match(/^[0-9a-fA-F]{24}$/)) {
    let err = new Error("Invalid item id");
    err.status = 400;
    return next(err);
  }

  model.findById(id)
  .then(item => {
    if(item){
      res.render("./item/show", { item });
    } else {
      let err = new Error("Cannot find item with id " + id);
      err.status = 404;
      next(err);
    }
  })
  .catch(err => next(err));
};

// edit: GET /items/:id/edit
exports.edit = (req, res, next) => {
  let id = req.params.id;
  if(!id.match(/^[0-9a-fA-F]{24}$/)) {
    let err = new Error("Invalid item id");
    err.status = 400;
    return next(err);
  }

  model.findById(id)
  .then(item => {
    if (item) {
      res.render("./item/edit", { item });
    } else {
      let err = new Error("Cannot find item with id " + id);
      err.status = 404;
      next(err);
    }
  })
  .catch(err => next(err));
};

exports.update = async (req, res, next) => {
  try {
    let id = req.params.id;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      let err = new Error("Invalid item ID");
      err.status = 400;
      return next(err);
    }

    // Check if req.body fields are populated
    console.log("Request Body:", req.body);
    console.log("Uploaded File:", req.file);

    // Create updatedFields object
    let updatedFields = {
      condition: req.body.condition,
      title: req.body.title,
      seller: req.body.seller,
      price: req.body.price ? parseFloat(req.body.price) : undefined,
      details: req.body.details,
      image: req.file ? req.file.filename : req.body.existingImage,
    };

    // Remove undefined values to prevent overwriting with `null`
    Object.keys(updatedFields).forEach(key => {
      if (updatedFields[key] === undefined) delete updatedFields[key];
    });

    console.log("Updated Fields:", updatedFields);

    // Find the item by ID and update it
    let updatedItem = await model.findByIdAndUpdate(id, updatedFields, { new: true, runValidators: true });

    if (!updatedItem) {
      let err = new Error("Cannot find item with ID " + id);
      err.status = 404;
      return next(err);
    }

    res.redirect("/items/" + id);
  } catch (err) {
    if (err.name === 'ValidationError') {
      err.status = 400;
    }
    next(err);
  }
};

// delete: DELETE /items/:id
exports.delete = (req, res, next) => {
  let id = req.params.id;
  if(!id.match(/^[0-9a-fA-F]{24}$/)) {
    let err = new Error("Invalid item id");
    err.status = 400;
    return next(err);
  }

  model.findByIdAndDelete(id, {useFindAndModify: false, runValidators: true})
  .then(item => {
    if(item){
      res.redirect("/items");
    } else {
      let err = new Error("Cannot find item with id " + id);
      err.status = 404;
      next(err);
    }
  })
  .catch(err => next(err));
};

exports.searchItems = async (req, res, next) => {
  const searchTerm = req.query.term;

  try {
    let searchResults = [];
    if (searchTerm) {
      searchResults = await model.search(searchTerm);
    }
    res.render('./item/search', { items: searchResults, searchTerm: searchTerm });
  } catch (err) {
    next(err);
  }
};