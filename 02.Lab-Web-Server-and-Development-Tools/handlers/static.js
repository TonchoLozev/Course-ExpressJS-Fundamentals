const fs = require('fs');
const mimeType = {
    'png': 'image/png',
    'css': 'text/css',
    'js': 'application/javascript'
};

function staticHandler(req, res) {
    if (req.path.startsWith('/static/')) {
        const extension = req.path.split('.').pop();

        res.writeHead(200, {
            'content-type': mimeType[extension]
        });

        fs.readFile('.' + req.path, 'utf8', (err, data) => {
            res.write(data);
            res.end();
        })
    }else{
        return true;
    }
}

module.exports = staticHandler;