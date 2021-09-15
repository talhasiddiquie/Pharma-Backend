var mongoose = require('mongoose');
const { Schema } = mongoose;

var surveyType = new Schema({
    objectId: { type: String },
    name: { type: String },
    isActive: { type: Boolean }
});

const SurveyType = mongoose.model('surveyType', surveyType);
module.exports = SurveyType;