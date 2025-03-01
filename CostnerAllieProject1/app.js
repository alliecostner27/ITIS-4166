const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const itemRoutes = require('./routes/itemRoutes');
const controller = require('./controllers/itemController');
const path = require('path');

const app = express();

let port = 3000;
let host = 'localhost';

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

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

// 404 Middleware (Unmatched Endpoints)
app.use((req, res, next) => {
    res.status(404).render('error', { message: 'Page Not Found', status: 404 });
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).render('error', {
        message: err.message || 'Internal Server Error',
        status: err.status || 500,
        error: err // Pass the error object for debugging (development only)
    });
});

app.listen(port, host, () => {
    console.log('Server is running on port ' + port);
});