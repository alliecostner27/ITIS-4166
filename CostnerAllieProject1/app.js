//require modules
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const itemRoutes = require('./routes/itemRoutes');
const controller = require('./controllers/itemController');
const path = require('path');

//create app
const app = express();

//configure app
let port = 3000;
let host = 'localhost';
let url = 'mongodb://localhost:27017/project3';
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
const mongoURI = 'mongodb+srv://admin:4970@cluster0.ckady.mongodb.net/project3?retryWrites=true&w=majority&appName=Cluster0';


//connect to mongoDB
mongoose.connect(mongoURI)
.then(() => {
    app.listen(port, host, () => {
        console.log('Server is running on port ' + port);
    });
})
.catch(err => console.log(err.message));


//mount middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));

app.get('/login', controller.login);
app.get('/signup', controller.signup);

app.get('/', (req, res) => {
    res.render('index');
});

app.use('/items', itemRoutes);

// Route for handling file uploads
app.post('/uploads', controller.uploadImage);

app.use((req, res, next) => {
    let err = new Error('The server cannot locate ' + req.url);
    err.status = 404;
    next(err);

});

app.use((err, req, res, next)=>{
    console.log(err.stack);
    if(!err.status) {
        err.status = 500;
        err.message = ("Internal Server Error");
    }

    res.status(err.status);
    res.render('error', {error: err});
});

