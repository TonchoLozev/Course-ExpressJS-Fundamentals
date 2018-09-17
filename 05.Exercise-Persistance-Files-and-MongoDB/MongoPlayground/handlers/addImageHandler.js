const ObjectId = require('mongoose').Types.ObjectId;
const formidable = require('formidable');
const Image = require('mongoose').model('Image');
const Tag = require('mongoose').model('Tag');

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

        let tags = fields.tagsID.split(',').slice(0, -1);
        tags = tags.filter((e, i) => {
            return tags.indexOf(e) === i;
        }).map(ObjectId);


        Image.create({
            url: fields.imageUrl,
            description: fields.description,
            tags: tags
        }).then(image => {
            for (let tag of tags) {
                Tag.findById(tag, function (err, data) {
                    const currentImages = data.images;
                    currentImages.push(image._id);

                    data.images = currentImages;
                    data.save().then((err, data)=> {
                        if(err){
                            throw err;
                        }
                    })
                });
            }

            res.writeHead(302, {
                location: '/'
            });
            res.end();
        }).catch(err => {
            res.writeHead(500, {
                'Content-Type': 'text/plain'
            });
            res.write('500 Server Erro r');
            res.end();
        });
    });
}

function deleteImg(req, res) {
    Image.deleteOne({_id: req.pathquery.id}).then(() => {
        res.writeHead(302, {
            location: '/'
        });
        res.end();
    }).catch(err => {
        res.writeHead(500, {
            'Content-Type': 'text/plain'
        });
        res.write('500 Server Erro r');
        res.end();
    });
}