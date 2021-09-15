const express = require("express");
const router = express.Router();
const Zone = require('../models/zone');
const _ = require("underscore");

router.post('/postZone', (req, res) => {
    var zoneData = req.body;
    if (zoneData.objectId === '' || zoneData.objectId === undefined) {
        const postZoneData = new Zone({
            name: zoneData.name,
            abbreviation: zoneData.abbreviation,
            identifier: zoneData.identifier,
            regionId: zoneData.regionId,
            provinceId:zoneData.provinceId,
            isActive: zoneData.isActive,
            createdBy: zoneData.createdBy,
            updatedBy: zoneData.updatedBy,
        })
        postZoneData.save(function (err, data) {
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
    else if (zoneData.objectId !== '') {
        Zone.findOneAndUpdate(
            { "_id": zoneData.objectId },
            { $set: _.omit(zoneData, '_id') },
            { new: true }
        ).then(() => {
            Zone.find({ "_id": zoneData.objectId }, function (err, documents) {
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

router.get('/getZones', (req, res) => {
    Zone.find(function (err, data) {
        if (err) {
            res.send({
                code: 404,
                msg: 'Something went wrong'
            })
        }
        else if (data) {
            res.send({
                code: 200,
                msg: 'All Zone Data',
                content: data
            })
        }
    })
})

router.post('/getSpecificZoneById', (req, res) => {
    let zoneData = req.body;
    Zone.find({ "_id": zoneData.objectId }, function (err, data) {
        if (err) {
            res.send({
                code: 404,
                msg: 'Something went wrong'
            })
        }
        else if (data) {
            res.send({
                code: 200,
                msg: 'Zone Data',
                content: data
            })
        }
    })
})

router.post('/deleteZone', (req, res) => {
    var zoneData = req.body;
    Zone.deleteOne({ "_id": zoneData.objectId },
        function (err, docs) {
            if (err) {
                res.json(err);
            }
            else {
                res.send({
                    code: 200,
                    msg: 'Zone data delete successfully',
                    content: docs
                });
            }
        });
})

module.exports = router;
