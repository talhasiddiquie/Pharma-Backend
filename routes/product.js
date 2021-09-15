const express = require("express");
const router = express.Router();
const Product = require('../models/product');
const _ = require("underscore");

router.post('/postProduct', (req, res) => {
    var productData = req.body;
    if (productData.objectId === '' || productData.objectId === undefined) {
        const postProductData = new Product({
            name: productData.name,
            abbreviation: productData.abbreviation,
            identifier: productData.identifier,
            isActive: productData.isActive,
            createdBy: productData.createdBy,
            updatedBy: productData.updatedBy,
            molecule: productData.molecule,
            sellingLine: productData.sellingLine,
            company: productData.company,
            approvedIndication: productData.approvedIndication,
            mrp: productData.mrp,
            tp: productData.tp,
            discount: productData.discount,
            sellingMessages: productData.sellingMessages,
            additionalInfo: productData.additionalInfo,
            files: productData.files,
        })
        postProductData.save(function (err, data) {
            if (err) {
                res.send({
                    code: 500,
                    content: 'Internal Server Error',
                    msg: 'API not called properly'
                })
            }
            else if (data) {
                res.send({
                    code: 200,
                    msg: 'Data saved successfully',
                    content: data
                });
            }
        })
    }
    else if (productData.objectId !== '') {
        Product.findOneAndUpdate(
            { "_id": productData.objectId },
            { $set: _.omit(productData, '_id') },
            { new: true }
        ).then(() => {
            Product.find({ "_id": productData.objectId }, function (err, documents) {
                res.send({
                    error: err,
                    content: documents,
                    code: 200,
                    msg: 'data updated successfullly'
                });
            })
        }).catch(() => res.status(422).send({ msg: 'Internal server error' }));
    }
})

router.get('/getProducts', (req, res) => {
    Product.find(function (err, data) {
        if (err) {
            res.send({
                code: 404,
                msg: 'Something went wrong'
            })
        }
        else if (data) {
            res.send({
                code: 200,
                msg: 'All Product Data',
                content: data
            })
        }
    })
})

router.post('/getSpecificProductById', (req, res) => {
    let productData = req.body;
    Product.find({ "_id": productData.objectId }, function (err, data) {
        if (err) {
            res.send({
                code: 404,
                msg: 'Something went wrong'
            })
        }
        else if (data) {
            res.send({
                code: 200,
                msg: 'Product Data',
                content: data
            })
        }
    })
})

router.post('/deleteProduct', (req, res) => {
    var productData = req.body;
    Product.deleteOne({ "_id": productData.objectId },
        function (err, docs) {
            if (err) {
                res.json(err);
            }
            else {
                res.send({
                    code: 200,
                    msg: 'Product data delete successfully',
                    content: docs
                });
            }
        });
})

module.exports = router;
