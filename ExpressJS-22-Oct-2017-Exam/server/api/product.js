const Product = require('mongoose').model('Product');

const allowedToppings = [
    'pickle',
    'tomato',
    'onion',
    'lettuce',
    'hot sauce',
    'extra sauce'
];

async function create(data) {
    const {
        category,
        size,
        imageUrl
    } = data;

    const toppings = data.toppings.split(',')
        .map(e => e.trim())
        .filter(e => e.length > 0 && allowedToppings.includes(e));

    return await Product.create({
        category,
        size: Number(size),
        imageUrl,
        toppings
    })
}

async function getAll() {
    return await Product.find({});
}

module.exports = {
    create,
    getAll
};