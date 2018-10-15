const productApi = require('../api/product');

module.exports = {
    placeGet: async (req, res) => {
        const toppings = {
            'pickle': false,
            'tomato': false,
            'onion': false,
            'lettuce': false,
            'hotsauce': false,
            'extrasauce': false,
        };

        const id = req.params.id;
        const product = await productApi.getById(id);

        product.toppings.forEach((e) => {
            switch (e) {
                case 'hot sauce':
                    toppings.hotsauce = true;
                    break;
                case 'extra sauce':
                    toppings.extrasauce = true;
                    break;
                default:
                    toppings[e] = true;
                    break;
            }
        });

        res.render('order/place', {product, toppings});
    },
    placePost: (req, res) => {
        res.json(req.body);
    }
};