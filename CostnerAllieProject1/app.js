const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const itemRoutes = require('./routes/itemRoutes');
const controller = require('./controllers/itemController');



//Create an express appLication
const app = express();


//configure app
let port = 3000;
let host = 'localhost';


//set the view engine ejs
app.set('view engine', 'ejs');

//mount middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));

// Routes for login and signup outside of itemRoutes
app.get('/login', controller.login);  // Render login.ejs
app.get('/signup', controller.signup);  // Render signUp.ejs


//set up routes
app.get('/', (req, res) => {
    res.render('index');
});

app.use('/items', itemRoutes);


//start the server
app.listen(port, host, () => {
    console.log('Server is running on port ' + port);
});