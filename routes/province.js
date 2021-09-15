const express = require("express");
const router = express.Router();
const Province = require('../models/province');
const _ = require("underscore");

router.post('/postProvince', (req, res) => {
    var provinceData = req.body;
    if (provinceData.objectId === '' || provinceData.objectId === undefined) {
        const postProvinceData = new Province({
            name: provinceData.name,
            isActive: provinceData.isActive,
            regionId: provinceData.regionId,
            objectId: provinceData.objectId
        })
        postProvinceData.save(function (err, data) {
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
    else if (provinceData.objectId !== '') {
        Province.findOneAndUpdate(
            { "_id": provinceData.objectId },
            { $set: _.omit(provinceData, '_id') },
            { new: true }
        ).then(() => {
            Province.find({ "_id": provinceData.objectId }, function (err, documents) {
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

router.get('/getProvinces', (req, res) => {
    Province.find(function (err, data) {
        if (err) {
            res.send({
                code: 404,
                msg: 'Something went wrong'
            })
        }
        else if (data) {
            res.send({
                code: 200,
                msg: 'All Province Data',
                content: data
            })
        }
    })
})

router.post('/getSpecificProvinceById', (req, res) => {
    let provinceData = req.body;
    Province.find({ "_id": provinceData.objectId }, function (err, data) {
        if (err) {
            res.send({
                code: 404,
                msg: 'Something went wrong'
            })
        }
        else if (data) {
            res.send({
                code: 200,
                msg: 'Province Data',
                content: data
            })
        }
    })
})

router.post('/deleteProvince', (req, res) => {
    var provinceData = req.body;
    Province.deleteOne({ "_id": provinceData.objectId },
        function (err, docs) {
            if (err) {
                res.json(err);
            }
            else {
                res.send({
                    code: 200,
                    msg: 'Province data delete successfully',
                    content: docs
                });
            }
        });
})

module.exports = router;
