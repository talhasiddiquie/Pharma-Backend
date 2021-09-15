const express = require("express");
const router = express.Router();
const Cities = require('../models/city');
const _ = require("underscore");
const verifyToken = require('../middlewares/verifyToken');

router.post('/postCity', (req, res) => {
    var cityData = req.body;
    if (cityData.objectId === '' || cityData.objectId === undefined) {
        const postCityData = new Cities({
            name: cityData.name,
            abbreviation: cityData.abbreviation,
            identifier: cityData.identifier,
            regionId: cityData.regionId,
            provinceId: cityData.provinceId,
            isActive: cityData.isActive,
            createdBy: cityData.createdBy,
            updatedBy: cityData.updatedBy,
        })
        postCityData.save(function (err, data) {
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
    else if (cityData.objectId !== '') {
        Cities.findOneAndUpdate(
            { "_id": cityData.objectId },
            { $set: _.omit(cityData, '_id') },
            { new: true }
        ).then(() => {
            Cities.find({ "_id": cityData.objectId }, function (err, documents) {
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

router.get('/getCities', (req, res) => {
    Cities.find(function (err, data) {
        if (err) {
            res.send({
                code: 404,
                msg: 'Something went wrong'
            })
        }
        else if (data) {
            res.send({
                code: 200,
                msg: 'All Cities Data',
                content: data
            })
        }
    })
})

router.post('/getSpecificCityById', (req, res) => {
    let cityData = req.body;
    Cities.find({ "_id": cityData.objectId }, function (err, data) {
        if (err) {
            res.send({
                code: 404,
                msg: 'Something went wrong'
            })
        }
        else if (data) {
            res.send({
                code: 200,
                msg: 'Cities Data',
                content: data
            })
        }
    })
})

router.post('/deleteCity', (req, res) => {
    var cityData = req.body;
    Cities.deleteOne({ "_id": cityData.objectId },
        function (err, docs) {
            if (err) {
                res.json(err);
            }
            else {
                res.send({
                    code: 200,
                    msg: 'Cities data delete successfully',
                    content: docs
                });
            }
        });
})

module.exports = router;
