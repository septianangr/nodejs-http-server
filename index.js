const http = require('http');
const fs = require('fs');
const { accessLog, errorLog } = require('./logs.js');

const server = http.createServer((req, res) => {

    // HTTP request URL
    const url = req.url;

    try {

        if (url === '/') {

            // Read file using fs core module
            const data = fs.readFileSync('./views/index.html', 'utf-8');

            // Set HTTP header
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');

            // Send response data
            res.end(data);

            // save access_logs by calling the logs module
            accessLog(req);

        } else if (url === '/about') {

            // Read file using fs core module
            const data = fs.readFileSync('./views/about.html', 'utf-8');

            // Set HTTP header
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');

            // Send response data
            res.end(data);

            // save access_logs by calling the logs module
            accessLog(req);

        } else {

            // Read file using fs core module
            const data = fs.readFileSync('./views/404.html', 'utf-8');

            // Set HTTP header
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');

            // Send response data
            res.end(data);

            // save access_logs by calling the logs module
            accessLog(req);
        }

    } catch (err) {

        // save error_logs by calling the logs module
        errorLog(req, err);
    }
});

// Define HTTP server port
server.listen(3000, () => {
    console.log('Server running on port 3000');
});