const express = require("express");
const router = express.Router();
const Tier = require('../models/tier');
const _ = require("underscore");

router.post('/postTier', (req, res) => {
    var tierData = req.body;
    if (tierData.objectId === '' || tierData.objectId === undefined) {
        const postTierData = new Tier({
            name: tierData.name,
            isActive: tierData.isActive,
        })
        postTierData.save(function (err, data) {
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
    else if (tierData.objectId !== '') {
        Tier.findOneAndUpdate(
            { "_id": tierData.objectId },
            { $set: _.omit(tierData, '_id') },
            { new: true }
        ).then(() => {
            Tier.find({ "_id": tierData.objectId }, function (err, documents) {
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

router.get('/getTiers', (req, res) => {
    Tier.find(function (err, data) {
        if (err) {
            res.send({
                code: 404,
                msg: 'Something went wrong'
            })
        }
        else if (data) {
            res.send({
                code: 200,
                msg: 'All Tier Data',
                content: data
            })
        }
    })
})

router.post('/getSpecificTierById', (req, res) => {
    let tierData = req.body;
    Tier.find({ "_id": tierData.objectId }, function (err, data) {
        if (err) {
            res.send({
                code: 404,
                msg: 'Something went wrong'
            })
        }
        else if (data) {
            res.send({
                code: 200,
                msg: 'Tier Data',
                content: data
            })
        }
    })
})

router.post('/deleteTier', (req, res) => {
    var tierData = req.body;
    Tier.deleteOne({ "_id": tierData.objectId },
        function (err, docs) {
            if (err) {
                res.json(err);
            }
            else {
                res.send({
                    code: 200,
                    msg: 'Tier data delete successfully',
                    content: docs
                });
            }
        });
})

module.exports = router;
