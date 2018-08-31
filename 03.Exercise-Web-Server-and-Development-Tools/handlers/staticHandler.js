const fs = require('fs');

const mimeTypes = {
    'css': 'text/css',
    'js': 'application/javascript',
    'jpg': 'image/jpeg',
    'png': 'image/png',
    'ico': 'image/x-icon'
};

function staticHandler(req, res) {
    if (req.path.startsWith('/public/') || req.path.startsWith('/scripts/') ||  req.path.startsWith('/config/') ) {
        const extension = req.path.split('.').pop();

        res.writeHead(200, {
            'Content-Type': mimeTypes[extension]
        });
        const read = fs.createReadStream('.' + req.path);
        read.pipe(res);
    } else {
        return true;
    }
}

module.exports = staticHandler;