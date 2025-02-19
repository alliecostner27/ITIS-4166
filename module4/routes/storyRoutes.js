const express = require('express');
const controller = require('../controllers/storyController');

const router = express.Router();

//GET /stories: send all stories to the user
router.get('/', controller.index);

//GET /stories/new: send html form to create a new story
router.get('/new', controller.new);

//POST /stories: create a new story
router.post('/', controller.create);

//GET /stories/:id: send details of story identified by id
router.get('/:id', controller.show);

//GET /stories/:id/edit: send html form to edit story identified by id
router.get('/:id/edit', controller.edit);

//PUT /stories/:id: update story identified by id
router.put('/:id', controller.update);

//DELETE /stories/:id: delete story identified by id
router.delete('/:id', controller.delete);

module.exports = router;