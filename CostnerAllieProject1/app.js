const express = require('express');
const morgan = require('morgan');


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

//set up routes
app.get('/', (req, res) => {
    res.render('index');
});

//start the server
app.listen(port, host, () => {
    console.log('Server is running on port ' + port);
});