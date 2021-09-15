var mongoose = require('mongoose');
const { Schema } = mongoose;

var surveyQuestionOptions = new Schema({
    objectId: { type: String },
    name: { type: String },
    questionId: { type: String },
    createdBy: { type: String },
    updatedBy: { type: String },
});

const SurveyQuestionOptions = mongoose.model('surveyQuestionOptions', surveyQuestionOptions);
module.exports = SurveyQuestionOptions;