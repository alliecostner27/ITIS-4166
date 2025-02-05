const http = require('http');

//require fs module to read and write files (using to read html file)
const fs = require('fs');

const port = 8084;

const host = 'localhost';

//creating server and adding event listener, so server can handle incoming requests
//callback function takes 2 params: req = request, res = response
const server = http.createServer((req, res) => {
    /* Important things to print out:
    console.log('method', req.method);
    console.log('url', req.url);
    console.log('headers', req.headers);
    */

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');

    let path = './';

    if (req.url === '/'){
        path = path + 'index.html';
    } else if (req.url === '/contact'){
        path = path + 'contact.html';
    } else if (req.url === '/about'){
        path = path + 'about.html';
    } else {
        res.statusCode = 404;
        path = path + '404.html';
    }

    fs.readFile(path, (err, data) => {
        if (err){
            console.log(err);
            res.end();
        } else {
            res.write(data);
            res.end();
        }
    }); 

});


//binding server to a port
server.listen(port, host, () => {
    console.log('Server is running on port', port);
});