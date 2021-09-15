const express = require("express");
const router = express.Router();
const SurveyQuestion = require('../models/survey-question');
const _ = require("underscore");

router.post('/postSurveyQuestions', (req, res) => {
    var surveyQuestionData = req.body;
    if (surveyQuestionData.objectId === '' || surveyQuestionData.objectId === undefined) {
        const postSurveyQuestionsData = new SurveyQuestion({
            question: surveyQuestionData.question,
            answerType: surveyQuestionData.answerType,
            surveyId: surveyQuestionData.surveyId,
            createdBy: surveyQuestionData.createdBy,
            updatedBy: surveyQuestionData.updatedBy,
        })
        postSurveyQuestionsData.save(function (err, data) {
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
        SurveyQuestion.findOneAndUpdate(
            { "_id": surveyQuestionData.objectId },
            { $set: _.omit(surveyQuestionData, '_id') },
            { new: true }
        ).then(() => {
            SurveyQuestion.find({ "_id": surveyQuestionData.objectId }, function (err, documents) {
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

router.get('/getSurveyQuestionss', (req, res) => {
    SurveyQuestion.find(function (err, data) {
        if (err) {
            res.send({
                code: 404,
                msg: 'Something went wrong'
            })
        }
        else if (data) {
            res.send({
                code: 200,
                msg: 'All SurveyQuestion Data',
                content: data
            })
        }
    })
})

router.post('/getSpecificSurveyQuestionsById', (req, res) => {
    let surveyQuestionData = req.body;
    SurveyQuestion.find({ "_id": surveyQuestionData.objectId }, function (err, data) {
        if (err) {
            res.send({
                code: 404,
                msg: 'Something went wrong'
            })
        }
        else if (data) {
            res.send({
                code: 200,
                msg: 'SurveyQuestion Data',
                content: data
            })
        }
    })
})

router.post('/deleteSurveyQuestions', (req, res) => {
    var surveyQuestionData = req.body;
    SurveyQuestion.deleteOne({ "_id": surveyQuestionData.objectId },
        function (err, docs) {
            if (err) {
                res.json(err);
            }
            else {
                res.send({
                    code: 200,
                    msg: 'SurveyQuestion data delete successfully',
                    content: docs
                });
            }
        });
})

module.exports = router;
