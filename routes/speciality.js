const express = require("express");
const router = express.Router();
const Speciality = require('../models/speciality');
const _ = require("underscore");

router.post('/postSpeciality', (req, res) => {
    var specialityData = req.body;
    if (specialityData.objectId === '' || specialityData.objectId === undefined) {
        const postSpecialityData = new Speciality({
            name: specialityData.name,
            isActive: specialityData.isActive,
        })
        postSpecialityData.save(function (err, data) {
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
    else if (specialityData.objectId !== '') {
        Speciality.findOneAndUpdate(
            { "_id": specialityData.objectId },
            { $set: _.omit(specialityData, '_id') },
            { new: true }
        ).then(() => {
            Speciality.find({ "_id": specialityData.objectId }, function (err, documents) {
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

router.get('/getSpecialities', (req, res) => {
    Speciality.find(function (err, data) {
        if (err) {
            res.send({
                code: 404,
                msg: 'Something went wrong'
            })
        }
        else if (data) {
            res.send({
                code: 200,
                msg: 'All Speciality Data',
                content: data
            })
        }
    })
})

router.post('/getSpecificSpecialityById', (req, res) => {
    let specialityData = req.body;
    Speciality.find({ "_id": specialityData.objectId }, function (err, data) {
        if (err) {
            res.send({
                code: 404,
                msg: 'Something went wrong'
            })
        }
        else if (data) {
            res.send({
                code: 200,
                msg: 'Speciality Data',
                content: data
            })
        }
    })
})

router.post('/deleteSpeciality', (req, res) => {
    var specialityData = req.body;
    Speciality.deleteOne({ "_id": specialityData.objectId },
        function (err, docs) {
            if (err) {
                res.json(err);
            }
            else {
                res.send({
                    code: 200,
                    msg: 'Speciality data delete successfully',
                    content: docs
                });
            }
        });
})

module.exports = router;
