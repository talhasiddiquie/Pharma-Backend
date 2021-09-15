const express = require("express");
const router = express.Router();
const Territory = require('../models/territory');
const _ = require("underscore");

router.post('/postTerritory', (req, res) => {
    var territoryData = req.body;
    if (territoryData.objectId === '' || territoryData.objectId === undefined) {
        const postTerritoryData = new Territory({
            name: territoryData.name,
            abbreviation: territoryData.abbreviation,
            identifier: territoryData.identifier,
            regionId: territoryData.regionId,
            zoneId: territoryData.zoneId,
            provinceId: territoryData.provinceId,
            cityId: territoryData.cityId,
            isActive: territoryData.isActive,
            createdBy: territoryData.createdBy,
            updatedBy: territoryData.updatedBy,
            
        })
        postTerritoryData.save(function (err, data) {
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
    else if (territoryData.objectId !== '') {
        Territory.findOneAndUpdate(
            { "_id": territoryData.objectId },
            { $set: _.omit(territoryData, '_id') },
            { new: true }
        ).then(() => {
            Territory.find({ "_id": territoryData.objectId }, function (err, documents) {
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

router.get('/getTerritorys', (req, res) => {
    Territory.find(function (err, data) {
        if (err) {
            res.send({
                code: 404,
                msg: 'Something went wrong'
            })
        }
        else if (data) {
            res.send({
                code: 200,
                msg: 'All Territory Data',
                content: data
            })
        }
    })
})

router.post('/getSpecificTerritoryById', (req, res) => {
    let territoryData = req.body;
    Territory.find({ "_id": territoryData.objectId }, function (err, data) {
        if (err) {
            res.send({
                code: 404,
                msg: 'Something went wrong'
            })
        }
        else if (data) {
            res.send({
                code: 200,
                msg: 'Territory Data',
                content: data
            })
        }
    })
})

router.post('/deleteTerritory', (req, res) => {
    var territoryData = req.body;
    Territory.deleteOne({ "_id": territoryData.objectId },
        function (err, docs) {
            if (err) {
                res.json(err);
            }
            else {
                res.send({
                    code: 200,
                    msg: 'Territory data delete successfully',
                    content: docs
                });
            }
        });
})

module.exports = router;
