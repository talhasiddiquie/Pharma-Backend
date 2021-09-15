const express = require("express");
const router = express.Router();
const Representative = require('../models/representative');
const _ = require("underscore");
const main = require("../middlewares/mailer");
const verifyToken = require('../middlewares/verifyToken')

router.post('/postRepresentative', (req, res) => {
    var representativeData = req.body;

    if (representativeData.objectId === '' || representativeData.objectId === undefined) {
        const postRepresentativeData = new Representative({
            name: representativeData.name,
            identifier: representativeData.identifier,
            designationId: representativeData.designationId,
            managerId: representativeData.managerId,
            designationDataStart: representativeData.designationDataStart,
            designationDataEnd: representativeData.designationDataEnd,
            provinceId: representativeData.provinceId,
            headquarterId: representativeData.headquarterId,
            regionId: representativeData.regionId,
            zoneId: representativeData.zoneId,
            cityId: representativeData.cityId,
            territoryId: representativeData.territoryId,
            phone: representativeData.phone,
            email: representativeData.email,
            gender: representativeData.gender,
            maritalStatus: representativeData.maritalStatus,
            dateOfBirth: representativeData.dateOfBirth,
            bloodGroupId: representativeData.bloodGroupId,
            workType: representativeData.workType,
            sellingLine: representativeData.sellingLine,
            isActive: representativeData.isActive,
            createdBy: representativeData.createdBy,
            updatedBy: representativeData.updatedBy,
            password: representativeData.password,
            representativeId: representativeData.representativeId
        })

        postRepresentativeData.save(function (err, data) {
            console.log(err, 'err');
            // console.log(data, 'data');

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
    else if (representativeData.objectId !== '') {
        Representative.findOneAndUpdate(
            { "_id": representativeData.objectId },
            { $set: _.omit(representativeData, '_id') },
            { new: true }
        ).then(() => {
            Representative.find({ "_id": representativeData.objectId }, function (err, documents) {
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

router.get('/getRepresentatives', (req, res) => {
    Representative.find(function (err, data) {
        if (err) {
            res.send({
                code: 404,
                msg: 'Something went wrong'
            })
        }
        else if (data) {
            res.send({
                code: 200,
                msg: 'All Representative Data',
                content: data
            })
        }
    })
})

router.post('/getSpecificRepresentativesById', (req, res) => {
    let representativeData = req.body;
    Representative.find({ "representativeId": representativeData.objectId }, function (err, data) {
        if (err) {
            res.send({
                code: 404,
                msg: 'Something went wrong'
            })
        }
        else if (data) {
            res.send({
                code: 200,
                msg: 'Employee Name Data',
                content: data
            })
        }
    })
})

router.post('/representativeByTeriitory', (req, res) => {
    let representativeData = req.body;
    Representative.find({ "territoryId": representativeData.objectId }, function (err, data) {
        if (err) {
            res.send({
                code: 404,
                msg: 'Something went wrong'
            })
        }
        else if (data) {
            res.send({
                code: 200,
                msg: 'Representative Data',
                content: data
            })
        }
    })
})


router.post('/sendEmail', (req, res) => {
    let representativeData = req.body;
    console.log(representativeData, 'email api');
    main(representativeData).then(response => {
        console.log(response, 'response');
        return res.status(200).json({ success: true, data: response });
    }).catch(err => {
        console.log(err, 'err in email send');
        return res.status(400).json({ error: "Error Occured" })
    })
})

router.post('/deleteRepresentative', (req, res) => {
    var representativeData = req.body;
    Representative.deleteOne({ "_id": representativeData.objectId },
        function (err, docs) {
            if (err) {
                res.json(err);
            }
            else {
                res.send({
                    code: 200,
                    msg: 'Representative data delete successfully',
                    content: docs
                });
            }
        });
})

module.exports = router;
