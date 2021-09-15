var mongoose = require('mongoose');
const { Schema } = mongoose;

var survey = new Schema({
    objectId: { type: String },

    name: { type: String },
    identifier: { type: String },
    documentType: { type: String },
    keys: { type: Array },
    questionsAnswerObj: { type: Object },
    questionAnsOptionsArr: { type: Array },
    answerOption: { type: String },
    answerOptionArr: { type: Array },
    isActive: { type: Boolean },
    createdBy: { type: String },
    updatedBy: { type: String },

});

const Survey = mongoose.model('survey', survey);
module.exports = Survey;