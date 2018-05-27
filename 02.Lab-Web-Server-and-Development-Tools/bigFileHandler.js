const fs = require('fs');

function handleBigFile(req, res) {
    if(req.path === '/bigfile'){
        const read = fs.createReadStream('./file.txt');

        res.writeHead(200, {
            'content-type': 'text/plain'
        });

        read.on('data', (data)=>{
            res.write(data);
        });
        read.on('end', ()=>{
            res.end();
        });
       // //fs.readFile('./file.txt', 'utf8', (err, data)=>{
       //     res.writeHead(200, {
       //         'content-type': 'text/plain'
       //     });
       //     res.write(data);
       //     res.end();
       // })
    }else{
        return true;
    }
}

module.exports = handleBigFile;