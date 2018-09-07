const ObjectId = require('mongoose').Types.ObjectId;
const formidable = require('formidable');
const Image = require('mongoose').model('Image');

module.exports = (req, res) => {
    if (req.pathname === '/addImage' && req.method === 'POST') {
        addImage(req, res)
    } else if (req.pathname === '/delete' && req.method === 'GET') {
        deleteImg(req, res)
    } else {
        return true
    }
};

function addImage(req, res) {
    // parse a file upload
    const form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
        if (err) {
            console.log(err);
            return;
        }
        res.writeHead(200, {'content-type': 'text/plain'});

        let tags =  fields.tagsID.split(',').slice(0, -1);
        tags = tags.filter((e, i) => {
            return tags.indexOf(e) === i;
        }).map(ObjectId);

        Image.create({
            url: fields.imageUrl,
            description: fields.description,
            tags: tags
        }).then(image => {
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
}