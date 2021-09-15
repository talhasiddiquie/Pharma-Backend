const express = require("express");
const router = express.Router();
const SurveyType = require('../models/survey-type');
const _ = require("underscore");

router.post('/postSurveyType', (req, res) => {
    var surveyTypeData = req.body;
    if (surveyTypeData.objectId === '' || surveyTypeData.objectId === undefined) {
        const postSurveyTypeData = new SurveyType({
            name: surveyTypeData.name,
            isActive: surveyTypeData.isActive,
        })
        postSurveyTypeData.save(function (err, data) {
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
    else if (surveyTypeData.objectId !== '') {
        SurveyType.findOneAndUpdate(
            { "_id": surveyTypeData.objectId },
            { $set: _.omit(surveyTypeData, '_id') },
            { new: true }
        ).then(() => {
            SurveyType.find({ "_id": surveyTypeData.objectId }, function (err, documents) {
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

router.get('/getSurveyTypes', (req, res) => {
    SurveyType.find(function (err, data) {
        if (err) {
            res.send({
                code: 404,
                msg: 'Something went wrong'
            })
        }
        else if (data) {
            res.send({
                code: 200,
                msg: 'All SurveyType Data',
                content: data
            })
        }
    })
})

router.post('/getSpecificSurveyTypeById', (req, res) => {
    let surveyTypeData = req.body;
    SurveyType.find({ "_id": surveyTypeData.objectId }, function (err, data) {
        if (err) {
            res.send({
                code: 404,
                msg: 'Something went wrong'
            })
        }
        else if (data) {
            res.send({
                code: 200,
                msg: 'SurveyType Data',
                content: data
            })
        }
    })
})

router.post('/deleteSurveyType', (req, res) => {
    var surveyTypeData = req.body;
    SurveyType.deleteOne({ "_id": surveyTypeData.objectId },
        function (err, docs) {
            if (err) {
                res.json(err);
            }
            else {
                res.send({
                    code: 200,
                    msg: 'SurveyType data delete successfully',
                    content: docs
                });
            }
        });
})

module.exports = router;
