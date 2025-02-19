const { DateTime } = require("luxon");
const {v4: uuidv4} = require('uuid');


const stories = [
{
    id: '1', 
    title: 'A funny story',
    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    author: 'Allie Costner', 
    createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
},
{
    id: '2',
    title: 'It is raining',
    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    author: 'Michael Scott',
    createdAt: DateTime.local(2021, 2, 12, 18, 0).toLocaleString(DateTime.DATETIME_SHORT)
},
{
    id: '3',
    title: 'Learning NBAD',
    content: 'I am currently taking NBAD this semester. NBAD is short for Network Based Application Development.',
    author: 'Allie Costner',
    createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
}   
];

exports.find = function(){
    return stories;
}

exports.findById = function(id){
    return stories.find(story => story.id === id);
}

exports.save = function(story){
    story.id = uuidv4();
    story.createdAt = DateTime.now().toLocaleString(DateTime.DATETIME_SHORT);
    stories.push(story);
}

exports.updateById = function(id, newStory){
    let story = stories.find(story => story.id === id);

    if (story) {
        story.title = newStory.title;
        story.content = newStory.content;
        return true;
    } else {
        return false;
    }
    
}

exports.deleteById = function(id){
    let index = stories.findIndex(story => story.id === id);

    if (index !== -1) {
        stories.splice(index, 1); //delete 1 object
        return true;
    } else {
        return false;
    }
}