const express = require("express");
const router = express.Router();
const SellingPitch = require('../models/selling-pitch');
const _ = require("underscore");

router.post('/postSellingPitch', (req, res) => {
    var sellingPitchData = req.body;
    if (sellingPitchData.objectId === '' || sellingPitchData.objectId === undefined) {
        const postSellingPitchData = new SellingPitch({
            identifier: sellingPitchData.identifier,
            productId: sellingPitchData.productId,
            callOpening: sellingPitchData.callOpening,
            callProbing: sellingPitchData.callProbing,
            problemSetup: sellingPitchData.problemSetup,
            keyMessages: sellingPitchData.keyMessages,
            gainingCommitment: sellingPitchData.gainingCommitment,
            isActive: sellingPitchData.isActive,
            createdBy: sellingPitchData.createdBy,
            updatedBy: sellingPitchData.updatedBy,
        })
        postSellingPitchData.save(function (err, data) {
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
    else if (sellingPitchData.objectId !== '') {
        SellingPitch.findOneAndUpdate(
            { "_id": sellingPitchData.objectId },
            { $set: _.omit(sellingPitchData, '_id') },
            { new: true }
        ).then(() => {
            SellingPitch.find({ "_id": sellingPitchData.objectId }, function (err, documents) {
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

router.get('/getSellingPitchs', (req, res) => {
    SellingPitch.find(function (err, data) {
        if (err) {
            res.send({
                code: 404,
                msg: 'Something went wrong'
            })
        }
        else if (data) {
            res.send({
                code: 200,
                msg: 'All Selling Pitch Data',
                content: data
            })
        }
    })
})

router.post('/getSpecificSellingPitchById', (req, res) => {
    let sellingPitchData = req.body;
    SellingPitch.find({ "_id": sellingPitchData.objectId }, function (err, data) {
        if (err) {
            res.send({
                code: 404,
                msg: 'Something went wrong'
            })
        }
        else if (data) {
            res.send({
                code: 200,
                msg: 'Selling Pitch Data',
                content: data
            })
        }
    })
})

router.post('/deleteSellingPitch', (req, res) => {
    var sellingPitchData = req.body;
    SellingPitch.deleteOne({ "_id": sellingPitchData.objectId },
        function (err, docs) {
            if (err) {
                res.json(err);
            }
            else {
                res.send({
                    code: 200,
                    msg: 'Selling Pitch data delete successfully',
                    content: docs
                });
            }
        });
})

module.exports = router;
