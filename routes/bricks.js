const express = require("express");
const router = express.Router();
const Bricks = require('../models/brick');
const _ = require("underscore");

router.post('/postBricks', (req, res) => {
    var bricksData = req.body;
    
    if (bricksData.objectId === '' || bricksData.objectId === undefined) {
        const postBricksData = new Bricks({
            name: bricksData.name,
            abbreviation: bricksData.abbreviation,
            identifier: bricksData.identifier,
            brickType: bricksData.brickType,
            regionId: bricksData.regionId,
            zoneId: bricksData.zoneId,
            territoryId: bricksData.territoryId,
            isActive: bricksData.isActive,
            createdBy: bricksData.createdBy,
            updatedBy: bricksData.updatedBy,
        })
        postBricksData.save(function (err, data) {
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
    else if (bricksData.objectId !== '') {
        Bricks.findOneAndUpdate(
            { "_id": bricksData.objectId },
            { $set: _.omit(bricksData, '_id') },
            { new: true }
        ).then(() => {
            Bricks.find({ "_id": bricksData.objectId }, function (err, documents) {
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

router.get('/getBricks', (req, res) => {
    Bricks.find(function (err, data) {
        if (err) {
            res.send({
                code: 404,
                msg: 'Something went wrong'
            })
        }
        else if (data) {
            res.send({
                code: 200,
                msg: 'All Bricks Data',
                content: data
            })
        }
    })
})

router.post('/getSpecificBricksById', (req, res) => {
    let bricksData = req.body;
    Bricks.find({ "_id": bricksData.objectId }, function (err, data) {
        if (err) {
            res.send({
                code: 404,
                msg: 'Something went wrong'
            })
        }
        else if (data) {
            res.send({
                code: 200,
                msg: 'Bricks Data',
                content: data
            })
        }
    })
})

router.post('/deleteBrick', (req, res) => {
    var bricksData = req.body;
    Bricks.deleteOne({ "_id": bricksData.objectId },
        function (err, docs) {
            if (err) {
                res.json(err);
            }
            else {
                res.send({
                    code: 200,
                    msg: 'Bricks data delete successfully',
                    content: docs
                });
            }
        });
})

module.exports = router;
