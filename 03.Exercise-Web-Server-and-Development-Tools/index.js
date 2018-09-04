const http = require('http');
const fs = require('fs');
const qs = require('querystring');
const url = require('url');
const handlers = require('./handlers');
const port = 5000;

const server = http.createServer(frontController);


function frontController(req, res) {
    req.path = url.parse(req.url).pathname;
    res.sendHtml = (path) => {
        fs.readFile(path, 'utf8', (err, data) => {
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });

            res.write(data);
            res.end();
        });
    };

    if (req.method === 'POST') {
        res.postData = (req, res) => {
            return new Promise((resp, rej) => {
                let body = '';

                req.on('data', (data) => {
                    body += data;
                    if (body.length > 1e6) {
                        req.connection.destroy();
                    }
                });
                req.on('end', () => {
                    resp(qs.parse(body));
                });
            });
        }
    }

    // if (req.method === 'GET') {
    for (let handler of handlers) {
        if (handler(req, res) !== true) {
            break;
        }
    }
    // } else if (req.method === 'POST') {
    //     let body = '';
    //     req.on('data', (data) => {
    //         body += data;
    //         if (body.length > 1e6) {
    //             req.connection.destroy();
    //         }
    //     });
    //     req.on('end', () => {
    //         const post = qs.parse(body);
    //         console.log(post);
    //     });
    // }
}

server.listen(port);

console.log(`Listening on port ${port}...`);