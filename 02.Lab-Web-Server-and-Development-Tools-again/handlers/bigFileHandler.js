const fs = require('fs');

function handleBigFile(req, res) {
    if (req.path === '/bigFile') {
        const read = fs.createReadStream('./file.txt');

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });

        read.pipe(res);
    } else {
        return true;
    }
}

module.exports = handleBigFile;