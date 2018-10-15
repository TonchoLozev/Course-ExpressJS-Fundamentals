const Order = require('mongoose').model('Order');

async function create(data) {
    return await  Order.create({

    });
}