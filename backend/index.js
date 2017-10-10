'use strict';

const http = require('http');
const path = require('path');
const fs = require('fs');
const { promisify } = require('util');


// Display a message on SIGTERM/SIGINT/SIGKILL
const process_finished = () => {
    console.log('Server closing');
    process.exit(process.exitCode);
};
process.on('SIGINT', process_finished)
       .on('SIGTERM', process_finished);


const root_dir = path.join(__dirname, '../');
const mimeTypeMap = new Map([
    ['.js', 'text/javascript'],
    ['.json', 'application/json'],
    ['.html', 'text/html'],
    ['.css', 'text/css'],
]);


http.createServer()
.on('request', (req, res) => {
    req.url = req.url.replace(/\?.*/, '');
    let filePath;
    if (/^\/dist/.exec(req.url)) { // if dist folder
        filePath = path.join(root_dir, req.url);
    }
    else if (/^\/node_modules/.exec(req.url)) { // if node_modules
        filePath = path.join(root_dir, req.url);
    }
    else {
        filePath = path.join(root_dir, 'src', req.url.replace(/^\/src/, ''));
    }


    promisify(fs.stat)(filePath)
    .then(
        (stats) => {
            // checks if directory, if so serve the index.html file
            if (stats.isDirectory())
                filePath = path.join(filePath, 'index.html');
            return promisify(fs.readFile)(filePath);
        }
    )
    .then(
        (data) => { // a file was found
            const ext = path.extname(filePath);
            const contentType = mimeTypeMap.get(ext);

            res.setHeader('Content-type',  contentType || 'text/plain');
            res.write(data);
            res.end();
        },
        (err) => { // no file was found or other type of error
            if (err.code === 'ENOENT') {
                console.log(`File ${req.url} not found`);
                res.statusCode = 404;
                res.end('File not found!');
            }
            else {
                console.error(err);
                res.statusCode = 500;
                res.end('Internal Server Error');
            }
        }
    );
})
.on('clientError', (err, res) => {
    res.end('HTTP/1.1 400 Bad Request');
})
.listen(8000, function () {
    const {address, port} = this.address();
    console.log(`Server is listening on ${address == '::' ? 'localhost' : address}:${port}`);
});
