const express = require('express');

const app = express();

let port = 3000;
let host = 'localhost';

//route handling:
//handle get request at '/'
app.get('/', (req, res) => {
    res.send('Home page');
});

app.get('/about', (req, res) => {
    res.send('About page');
});

app.get('/contact', (req, res) => {
    res.send('Contact page');
});

app.listen(port, host, () => {
    console.log('Server is running on at port', port);
});