const express = require("express");
const router = express.Router();
const Companies = require('../models/company');
const _ = require("underscore");

router.post('/postCompany', (req, res) => {
    var companyData = req.body;
    if (companyData.objectId === '' || companyData.objectId === undefined) {
        const postCompanyData = new Companies({
            name: companyData.name,
            abbreviation: companyData.abbreviation,
            identifier: companyData.identifier,
            isActive: companyData.isActive,
            createdBy: companyData.createdBy,
            updatedBy: companyData.updatedBy,
            logoImg: companyData.logoImg,
            address: companyData.address,
            contactPerson: companyData.contactPerson,
            contactNumber: companyData.contactNumber,
            contactDetail: companyData.contactDetail,
        })
        postCompanyData.save(function (err, data) {
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
    else if (companyData.objectId !== '') {
        Companies.findOneAndUpdate(
            { "_id": companyData.objectId },
            { $set: _.omit(companyData, '_id') },
            { new: true }
        ).then(() => {
            Companies.find({ "_id": companyData.objectId }, function (err, documents) {
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

router.get('/getCompanies', (req, res) => {
    Companies.find(function (err, data) {
        if (err) {
            res.send({
                code: 404,
                msg: 'Something went wrong'
            })
        }
        else if (data) {
            res.send({
                code: 200,
                msg: 'All Companies Data',
                content: data
            })
        }
    })
})

router.post('/getSpecificCompanyById', (req, res) => {
    let companyData = req.body;
    Companies.find({ "_id": companyData.objectId }, function (err, data) {
        if (err) {
            res.send({
                code: 404,
                msg: 'Something went wrong'
            })
        }
        else if (data) {
            res.send({
                code: 200,
                msg: 'Companies Data',
                content: data
            })
        }
    })
})

router.post('/deleteCompany', (req, res) => {
    var companyData = req.body;
    Companies.deleteOne({ "_id": companyData.objectId },
        function (err, docs) {
            if (err) {
                res.json(err);
            }
            else {
                res.send({
                    code: 200,
                    msg: 'Company data delete successfully',
                    content: docs
                });
            }
        });
})

module.exports = router;
