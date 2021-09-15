const express = require("express");
const router = express.Router();
const Designation = require('../models/designation');
const _ = require("underscore");

router.post('/postDesignation', (req, res) => {
    var designationData = req.body;
    if (designationData.objectId === '' || designationData.objectId === undefined) {
        const postDesignationData = new Designation({
            name: designationData.name,
            type: designationData.type,
            isActive: designationData.isActive,
        })
        postDesignationData.save(function (err, data) {
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
    else if (designationData.objectId !== '') {
        Designation.findOneAndUpdate(
            { "_id": designationData.objectId },
            { $set: _.omit(designationData, '_id') },
            { new: true }
        ).then(() => {
            Designation.find({ "_id": designationData.objectId }, function (err, documents) {
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

router.get('/getDesignations', (req, res) => {
    Designation.find(function (err, data) {
        if (err) {
            res.send({
                code: 404,
                msg: 'Something went wrong'
            })
        }
        else if (data) {
            res.send({
                code: 200,
                msg: 'All Designation Data',
                content: data
            })
        }
    })
})

router.post('/getSpecificDesignationById', (req, res) => {
    let designationData = req.body;
    Designation.find({ "_id": designationData.objectId }, function (err, data) {
        if (err) {
            res.send({
                code: 404,
                msg: 'Something went wrong'
            })
        }
        else if (data) {
            res.send({
                code: 200,
                msg: 'Designation Data',
                content: data
            })
        }
    })
})

router.post('/deleteDesignation', (req, res) => {
    var designationData = req.body;
    Designation.deleteOne({ "_id": designationData.objectId },
        function (err, docs) {
            if (err) {
                res.json(err);
            }
            else {
                res.send({
                    code: 200,
                    msg: 'Designation data delete successfully',
                    content: docs
                });
            }
        });
})

module.exports = router;
