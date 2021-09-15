const express = require("express");
const router = express.Router();
const SurveyQuestionOptions = require('../models/survey-question-option');
const _ = require("underscore");

router.post('/postSurveyQuestionOptions', (req, res) => {
    var surveyQuestionData = req.body;
    if (surveyQuestionData.objectId === '' || surveyQuestionData.objectId === undefined) {
        const postSurveyQuestionOptionsData = new SurveyQuestionOptions({
            name: surveyQuestionData.name,
            questionId: surveyQuestionData.questionId,
            createdBy: surveyQuestionData.createdBy,
            updatedBy: surveyQuestionData.updatedBy,
        })
        postSurveyQuestionOptionsData.save(function (err, data) {
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
    else if (surveyQuestionData.objectId !== '') {
        SurveyQuestionOptions.findOneAndUpdate(
            { "_id": surveyQuestionData.objectId },
            { $set: _.omit(surveyQuestionData, '_id') },
            { new: true }
        ).then(() => {
            SurveyQuestionOptions.find({ "_id": surveyQuestionData.objectId }, function (err, documents) {
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

router.get('/getSurveyQuestionOptions', (req, res) => {
    SurveyQuestionOptions.find(function (err, data) {
        if (err) {
            res.send({
                code: 404,
                msg: 'Something went wrong'
            })
        }
        else if (data) {
            res.send({
                code: 200,
                msg: 'All Survey Question Options Data',
                content: data
            })
        }
    })
})

router.post('/getSpecificSurveyQuestionOptionsById', (req, res) => {
    let surveyQuestionData = req.body;
    SurveyQuestionOptions.find({ "_id": surveyQuestionData.objectId }, function (err, data) {
        if (err) {
            res.send({
                code: 404,
                msg: 'Something went wrong'
            })
        }
        else if (data) {
            res.send({
                code: 200,
                msg: 'Survey Question Options Data',
                content: data
            })
        }
    })
})

router.post('/deleteSurveyQuestionOptions', (req, res) => {
    var surveyQuestionData = req.body;
    SurveyQuestionOptions.deleteOne({ "_id": surveyQuestionData.objectId },
        function (err, docs) {
            if (err) {
                res.json(err);
            }
            else {
                res.send({
                    code: 200,
                    msg: 'Survey Question Options data delete successfully',
                    content: docs
                });
            }
        });
})

module.exports = router;
