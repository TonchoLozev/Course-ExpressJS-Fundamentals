const fs = require('fs');

const mimeTypes = {
    'css': 'text/css',
    'js': 'application/javascript',
    'jpeg': 'image/jpeg'
};

function staticHandler(req, res) {
    if (req.path.startsWith('/static/')) {
        const extension = req.path.split('.').pop();

        res.writeHead(200, {
            'Content-Type': mimeTypes[extension]
        });

        fs.readFile('.' + req.path, 'utf8', (err, data) => {
            res.write(data);
            res.end();
        });
    } else {
        return true;
    }
}

module.exports = staticHandler;