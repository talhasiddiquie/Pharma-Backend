var mongoose = require('mongoose');
const { Schema } = mongoose;

var surveyQuestion = new Schema({
    objectId: { type: String },
    question: { type: String },
    answerType: { type: String },
    surveyId: { type: String},
    createdBy: { type: String },
    updatedBy: { type: String },
});

const SurveyQuestion = mongoose.model('surveyQuestion', surveyQuestion);
module.exports = SurveyQuestion;