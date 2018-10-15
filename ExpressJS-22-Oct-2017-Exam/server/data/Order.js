const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    creator: {type: mongoose.SchemaTypes.ObjectId, required: true},
    product: {type: mongoose.SchemaTypes.ObjectId, required: true},
    date: {type: Date, default: Date.now},
    toppings: {type: [String], default: []},
    status: {type: String, enum: ['Pending', 'In Progress', 'In Transit', 'Delivered'], default: 'Pending'}
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;