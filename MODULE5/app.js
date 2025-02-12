const express = require('express');

const { v4: uuidv4 } = require('uuid');

//third-party middleware
const morgan = require('morgan')

const app = express();
let port = 3000;
let host = 'localhost';
app.set('view engine', 'ejs');

let students = [
    {   id: '1', 
        name: 'Alice', 
        major: 'Computer Science', 
        gpa: 3.2,
        profile: '/images/alice.jpg'},
    {   id: '2', 
        name: 'Bob', 
        major: 'Biology', 
        gpa: 3.0,
        profile: '/images/bob.jpg'},
    {   id: '3', 
        name: 'Charlie', 
        major: 'Physics', 
        gpa: 3.8,
        profile: '/images/charlie.jpg'},
];

function firstMiddleWare(req, res, next) {
    console.log('First Middleware');
    next();
};

const logger = (req, res, next) => {
    console.log(req.url + ' ' + res.statusCode);
    next();
};

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));


app.get('/', (req, res) => {
    res.render('index');
});

app.get('/students', (req, res) => {
    res.json(students);
});

app.post('/students', (req, res) => {
    let student = req.body;
    console.log(student);
    student.id = uuidv4();
    students.push(student)
    res.redirect('/students');
});

app.get('/students/new', (req, res) => {
    res.render('new');
});

app.get('/students/:sid', (req, res) => {
    let id = req.params.sid;
    let student = students.find(element => element.id === id);
    res.render('student', {student});
});


app.listen(port, host, () => {
    console.log('The server is running at port', port);
});