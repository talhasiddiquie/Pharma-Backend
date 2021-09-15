const express = require("express");
const router = express.Router();
const Hospital = require('../models/hospital');
const _ = require("underscore");

router.post('/postHospital', (req, res) => {
    var hospitalData = req.body;
    if (hospitalData.objectId === '' || hospitalData.objectId === undefined) {
        const postHospitalData = new Hospital({
            name: hospitalData.name,
            abbreviation: hospitalData.abbreviation,
            identifier: hospitalData.identifier,
            isActive: hospitalData.isActive,
            createdBy: hospitalData.createdBy,
            updatedBy: hospitalData.updatedBy,
            address: hospitalData.address,
            phone: hospitalData.phone,
            regionId: hospitalData.regionId,
            zoneId: hospitalData.zoneId,
            territoryId: hospitalData.territoryId,
            cityId: hospitalData.cityId,
            brickId: hospitalData.brickId
        })
        postHospitalData.save(function (err, data) {
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
    else if (hospitalData.objectId !== '') {
        Hospital.findOneAndUpdate(
            { "_id": hospitalData.objectId },
            { $set: _.omit(hospitalData, '_id') },
            { new: true }
        ).then(() => {
            Hospital.find({ "_id": hospitalData.objectId }, function (err, documents) {
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

router.get('/getHospitals', (req, res) => {
    Hospital.find(function (err, data) {
        if (err) {
            res.send({
                code: 404,
                msg: 'Something went wrong'
            })
        }
        else if (data) {
            res.send({
                code: 200,
                msg: 'All Hospital Data',
                content: data
            })
        }
    })
})

router.post('/getSpecificHospitalById', (req, res) => {
    let hospitalData = req.body;
    Hospital.find({ "_id": hospitalData.objectId }, function (err, data) {
        if (err) {
            res.send({
                code: 404,
                msg: 'Something went wrong'
            })
        }
        else if (data) {
            res.send({
                code: 200,
                msg: 'Hospital Data',
                content: data
            })
        }
    })
})

router.post('/deleteHospital', (req, res) => {
    var hospitalData = req.body;
    Hospital.deleteOne({ "_id": hospitalData.objectId },
        function (err, docs) {
            if (err) {
                res.json(err);
            }
            else {
                res.send({
                    code: 200,
                    msg: 'Hospital data delete successfully',
                    content: docs
                });
            }
        });
})

module.exports = router;
