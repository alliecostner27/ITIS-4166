const express = require('express');
const controller = require('../controllers/itemController');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'public/uploads/' });

// index: GET /items
router.get('/', controller.index);

// new: GET /items/new
router.get('/new', controller.new);

// create: POST /items
router.post('/', upload.single('image'), controller.create);  // Handle image upload for create

// show: GET /items/:id
router.get('/:id', controller.show);

// edit: GET /items/:id/edit
router.get('/:id/edit', controller.edit);

// update: PUT /items/:id
router.put('/:id', upload.single('image'), controller.update);  // Handle image upload for update

// delete: DELETE /items/:id
router.delete('/:id', controller.delete);

module.exports = router;

