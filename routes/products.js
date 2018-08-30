const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Product = mongoose.model('Product');

router.post('/', (req, res) => {
    let newProduct = new Product();
    newProduct.description = req.body.description;
    newProduct.price = req.body.price;
    newProduct.img = req.body.img;
    newProduct.save((err) => {
        if(err) {
            res.sendStatus(500)
        } else {
            res.sendStatus(200)
        }
    })
})

router.get('/', (req, res) => {
    Product.find({}).then((products) => {
        res.json(products)
    })
})

router.get('/:id', (req, res) => {
    Product.find({_id: req.params.id}).then((product) => {
        res.json(product)
    })
})

router.put('/:id', (req, res) => {
    Product.findById(req.params.id, (err, product) => {
        if(err) {
            res.sendStatus(500)
        } else {
            let productTrackingInfo = product.tracking_info;
            productTrackingInfo.push(req.body);
            product.tracking_info = productTrackingInfo;
            product.save((err) => {
                if(err) {
                    res.sendStatus(200)
                } else {
                    res.sendStatus(200)
                }
            })
        }
    })
})

module.exports = router;