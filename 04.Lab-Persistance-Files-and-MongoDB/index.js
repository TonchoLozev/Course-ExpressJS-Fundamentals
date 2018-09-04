const fs = require('fs');
const http = require('http');
const formidable = require('formidable');

http.createServer((req, res) => {
    if (req.method === 'GET') {
        fs.readFile('./index.html', 'utf8', (err, file) => {
            if (err) {
                console.log(err);

                return;
            }

            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.write(file);
            res.end()
        })
    } else if (req.method === 'POST') {
        let form = new formidable.IncomingForm();

        form.parse(req, (err, fields, files) => {
            if (err) {
                console.log(err);
                return;
            }

            const file = files.upload;
            let tempPath = file.path;
            let fileName = file.name;

            fs.rename(tempPath, './files/' + fileName, (err) => {
                if (err) {
                    console.log(err);
                    return;
                }
            });
            res.write('Thank you!');
            res.end()
        })
    }
}).listen(5000);

console.log('Server is running on port 5000');

//reading file

// fs.readFile('./package.json', 'utf8', (err, file) => {
//     console.log(file);
// });


//reading directory

// fs.readdir('./', 'utf8', (err, files) => {
//     fs.readFile(files[2], 'utf8', (err, file) => {
//         console.log(file);
//     })
// });


//making directory

// fs.mkdir('./waza', (err, dir) => {
//     console.log(err, dir)
// });


//rename file

// fs.rename('./waza', './madafaka', (err, data)=> {
//     console.log(err, data)
// });


//creating a file and wrinting in it

// fs.writeFile('./pacov.txt', 'waza jorka!', (err) => {
//    console.log(err);
// });


//deleting directory

// fs.rmdir('./madafaka', (err) => {
//     console.log(err);
// });

