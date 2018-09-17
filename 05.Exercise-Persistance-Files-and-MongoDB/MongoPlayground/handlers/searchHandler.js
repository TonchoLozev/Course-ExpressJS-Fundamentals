const Image = require('mongoose').model('Image');
const Tag = require('mongoose').model('Tag');
const fs = require('fs');

module.exports = (req, res) => {
    if (req.pathname === '/search') {
        fs.readFile('./views/results.html', 'utf8', (err, html) => {
            if (err) {
                throw err;
            }
            const params = {};
            if (req.pathquery.tagName) {
                const tags = req.pathquery.tagName.split(',').filter(e => e.length > 0);
                if (tags.length > 0) {
                    Tag.find({name: {$in: tags}}).then(tagsId => {
                        findCats(req, res, tagsId, html);
                    })
                }
            }
            if (req.pathquery.afterDate && req.pathquery.beforeDate) {
                console.log('both')
                return;
            }
            if (req.pathquery.afterDate) {
                console.log('after');
            }
            if (req.pathquery.beforeDate) {
                console.log('before')
            }
            if (req.pathquery.Limit) {
                console.log('limit')
            }
        });
    } else {
        return true
    }
};

async function findCats(req, res, imagesId, html) {
    const images = [];
    let imageHtml = '';
    for (let tag of imagesId) {
        for (let image of tag.images) {
            await Image.findById(image, function (err, data) {
                images.push(data);
            })
        }
    }
    if (images.length > 0) {
        for (let image of images) {
            imageHtml += `<fieldset id ="${image._id}">
                <img src="${image.url}"/>
                <p>${image.description}<p/>
                <button onclick='location.href="/delete?id=${image._id}"' class='deleteBtn'>Delete</button>
             </fieldset>`;
        }
    } else {
        imageHtml += `<div>No images found!</div>`
    }

    html = html.replace("<div class='replaceMe'></div>", imageHtml);

    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.write(html);
    res.end();
}
