const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storySchema = new Schema({
    title: {type: String, required: [true, 'Title is required']},
    author: {type: String, required: [true, 'Author is required']},
    content: {type: String, required: [true, 'Content is required'], minLength: [10, 'Content must be at least 10 characters long']},

}, 
{timestamps: true}
);

//collection name is stories in the database
module.exports = mongoose.model('Story', storySchema);
//we can now use Story to create, read, update, and delete stories