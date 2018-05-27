let http = require('http');
let fs = require('fs');
let url = require('url');
const handlers = require('./handlers/index');

const server = http.createServer(frontController);
const port = 5000;

//front Controller in terminology of MVC
function frontController(req, res) {
    req.path = url.parse(req.url).pathname;
    res.sendHtml = (path) => {
        fs.readFile(path, 'utf8', (err, data) => {
            //to be sure our browser will read the content properly
            res.writeHead(200, {
                'content-type': 'text/html'
            });
            res.write(data);
            res.end();
        });
    };
    if (req.method === 'GET') {
        for (let handler of handlers) {
            if (handler(req, res) !== true) {
                break;
            }
        }
    } else if (req.method === 'POST') {
        let body = '';
        req.on('data', (data) => {
            body += data;
        });
        req.on('end', () => {
            console.log(body);
            res.end();
        })
    }
}

server.listen(port);
console.log(`Server is on and is listening on port: ${port}`);