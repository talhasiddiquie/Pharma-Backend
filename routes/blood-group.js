const express = require("express");
const router = express.Router();
const BloodGroup = require('../models/blood-group');
const _ = require("underscore");


router.post('/postBloodGroup', (req, res) => {
    var bloodGroupData = req.body;
    if (bloodGroupData.objectId === '' || bloodGroupData.objectId === undefined) {
        const postbloodGroupData = new BloodGroup({
            name: bloodGroupData.name,
            isActive: bloodGroupData.isActive,
        })
        postbloodGroupData.save(function (err, data) {
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
    else if (bloodGroupData.objectId !== '') {
        BloodGroup.findOneAndUpdate(
            { "_id": bloodGroupData.objectId },
            { $set: _.omit(bloodGroupData, '_id') },
            { new: true }
        ).then(() => {
            BloodGroup.find({ "_id": bloodGroupData.objectId }, function (err, documents) {
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

router.get('/getBloodGroup', (req, res) => {
    BloodGroup.find(function (err, data) {
        if (err) {
            res.send({
                code: 404,
                msg: 'Something went wrong'
            })
        }
        else if (data) {
            res.send({
                code: 200,
                msg: 'All BloodGroup Data',
                content: data
            })
        }
    })
})

router.post('/getSpecificBloodGroupById', (req, res) => {
    let bloodGroupData = req.body;
    BloodGroup.find({ "_id": bloodGroupData.objectId }, function (err, data) {
        if (err) {
            res.send({
                code: 404,
                msg: 'Something went wrong'
            })
        }
        else if (data) {
            res.send({
                code: 200,
                msg: 'Blood Group Data',
                content: data
            })
        }
    })
})

router.post('/deleteBloodGroup', (req, res) => {
    var bloodGroupData = req.body;
    BloodGroup.deleteOne({ "_id": bloodGroupData.objectId },
        function (err, docs) {
            if (err) {
                res.json(err);
            }
            else {
                res.send({
                    code: 200,
                    msg: 'Blood Group data delete successfully',
                    content: docs
                });
            }
        });
})

module.exports = router;