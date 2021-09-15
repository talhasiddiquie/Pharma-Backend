var mongoose = require('mongoose');
const { Schema } = mongoose;

var qualification = new Schema({
    objectId: { type: String },
    name: { type: String },
    isActive: { type: Boolean }
});

const Qualification = mongoose.model('qualification', qualification);
module.exports = Qualification;