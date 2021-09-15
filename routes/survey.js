const express = require("express");
const router = express.Router();
const Survey = require('../models/survey');
const _ = require("underscore");

router.post('/postSurvey', (req, res) => {
    var surveyData = req.body;
    if (surveyData.objectId === '' || surveyData.objectId === undefined) {
        const postSurveyData = new Survey({
            name: surveyData.name,
            identifier: surveyData.identifier,
            documentType: surveyData.documentType,
            keys: surveyData.keys,
            questionsAnswerObj: surveyData.questionsAnswerObj,
            questionAnsOptionsArr: surveyData.questionAnsOptionsArr,

            answerOption: surveyData.answerOption,
            answerOptionArr: surveyData.answerOptionArr,

            isActive: surveyData.isActive,
            createdBy: surveyData.createdBy,
            updatedBy: surveyData.updatedBy,

        })
        postSurveyData.save(function (err, data) {
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
    else if (surveyData.objectId !== '') {
        Survey.findOneAndUpdate(
            { "_id": surveyData.objectId },
            { $set: _.omit(surveyData, '_id') },
            { new: true }
        ).then(() => {
            Survey.find({ "_id": surveyData.objectId }, function (err, documents) {
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

router.get('/getSurveys', (req, res) => {
    Survey.find(function (err, data) {
        if (err) {
            res.send({
                code: 404,
                msg: 'Something went wrong'
            })
        }
        else if (data) {
            res.send({
                code: 200,
                msg: 'All Survey Data',
                content: data
            })
        }
    })
})

router.post('/getSpecificSurveyById', (req, res) => {
    let surveyData = req.body;
    Survey.find({ "_id": surveyData.objectId }, function (err, data) {
        if (err) {
            res.send({
                code: 404,
                msg: 'Something went wrong'
            })
        }
        else if (data) {
            res.send({
                code: 200,
                msg: 'Survey Data',
                content: data
            })
        }
    })
})

router.post('/deleteSurvey', (req, res) => {
    var surveyData = req.body;
    Survey.deleteOne({ "_id": surveyData.objectId },
        function (err, docs) {
            if (err) {
                res.json(err);
            }
            else {
                res.send({
                    code: 200,
                    msg: 'Survey data delete successfully',
                    content: docs
                });
            }
        });
})

module.exports = router;
