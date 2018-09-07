const formidable = require('formidable');
//when we import model like this we have all the crud operations in the collection that is under the given schema
const Tag = require('mongoose').model('Tag');

module.exports = (req, res) => {
    if (req.pathname === '/generateTag' && req.method === 'POST') {
        // parse a file upload
        const form = new formidable.IncomingForm();

        form.parse(req, function (err, fields, files) {
            res.writeHead(200, {'content-type': 'text/plain'});
            Tag.create({name: fields.tagName, images: []}).then(tag => {
                res.writeHead(302, {
                    location: '/'
                });
                res.end();
            }).catch(err => {
                cres.writeHead(500, {
                    'Content-Type': 'text/plain'
                });
                res.write('500 Server Error');
                res.end();
            });

        });
    } else {
        return true
    }
};
