const express = require("express");
const router = express.Router();
const Qualification = require('../models/qualification');
const _ = require("underscore");

router.post('/postQualification', (req, res) => {
    var qualificationData = req.body;
    if (qualificationData.objectId === '' || qualificationData.objectId === undefined) {
        const postQualificationData = new Qualification({
            name: qualificationData.name,
            isActive: qualificationData.isActive,
        })
        postQualificationData.save(function (err, data) {
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
    else if (qualificationData.objectId !== '') {
        Qualification.findOneAndUpdate(
            { "_id": qualificationData.objectId },
            { $set: _.omit(qualificationData, '_id') },
            { new: true }
        ).then(() => {
            Qualification.find({ "_id": qualificationData.objectId }, function (err, documents) {
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

router.get('/getQualifications', (req, res) => {
    Qualification.find(function (err, data) {
        if (err) {
            res.send({
                code: 404,
                msg: 'Something went wrong'
            })
        }
        else if (data) {
            res.send({
                code: 200,
                msg: 'All Qualification Data',
                content: data
            })
        }
    })
})

router.post('/getSpecificQualificationById', (req, res) => {
    let qualificationData = req.body;
    Qualification.find({ "_id": qualificationData.objectId }, function (err, data) {
        if (err) {
            res.send({
                code: 404,
                msg: 'Something went wrong'
            })
        }
        else if (data) {
            res.send({
                code: 200,
                msg: 'Qualification Data',
                content: data
            })
        }
    })
})

router.post('/deleteQualification', (req, res) => {
    var qualificationData = req.body;
    Qualification.deleteOne({ "_id": qualificationData.objectId },
        function (err, docs) {
            if (err) {
                res.json(err);
            }
            else {
                res.send({
                    code: 200,
                    msg: 'Qualification data delete successfully',
                    content: docs
                });
            }
        });
})

module.exports = router;
