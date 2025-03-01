const model = require("../models/item");

exports.index = (req, res, next) => {
    try {
        let items = model.find();
        items.sort((a, b) => a.price - b.price);
        res.render("./item/index", { items });
    } catch (err) {
        next(err);
    }
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

exports.create = (req, res, next) => {
    try {
        let newItem = {
            condition: req.body.condition,
            title: req.body.title,
            seller: req.body.seller,
            price: parseFloat(req.body.price),
            details: req.body.details,
            image: req.body.image || "default.jpg",
        };
        model.save(newItem);
        res.redirect("/items");
    } catch (err) {
        next(err);
    }
};

exports.show = (req, res, next) => {
    try {
        let id = req.params.id;
        let item = model.findById(id);
        if (item) {
            res.render("./item/show", { item });
        } else {
            let err = new Error("Cannot find item with id " + id);
            err.status = 404;
            next(err);
        }
    } catch (err) {
        next(err);
    }
};

exports.edit = (req, res, next) => {
    try {
        let id = req.params.id;
        let item = model.findById(id);
        if (item) {
            res.render("./item/edit", { item });
        } else {
            let err = new Error("Cannot find item with id " + id);
            err.status = 404;
            next(err);
        }
    } catch (err) {
        next(err);
    }
};

exports.update = (req, res, next) => {
    try {
        let id = req.params.id;
        let updatedItem = {
            condition: req.body.condition,
            title: req.body.title,
            seller: req.body.seller,
            price: parseFloat(req.body.price),
            details: req.body.details,
            image: req.file ? req.file.filename : req.body.existingImage,
        };
        if (model.updateById(id, updatedItem)) {
            res.redirect("/items/" + id);
        } else {
            let err = new Error("Cannot find item with id " + id);
            err.status = 404;
            next(err);
        }
    } catch (err) {
        next(err);
    }
};

exports.delete = (req, res, next) => {
    try {
        let id = req.params.id;
        if (model.deleteById(id)) {
            res.redirect("/items");
        } else {
            let err = new Error("Cannot find item with id " + id);
            err.status = 404;
            next(err);
        }
    } catch (err) {
        next(err);
    }
};