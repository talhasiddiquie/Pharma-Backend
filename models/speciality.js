var mongoose = require('mongoose');
const { Schema } = mongoose;

var speciality = new Schema({
    objectId: { type: String },
    name: { type: String },
    isActive: { type: Boolean }
});

const Speciality = mongoose.model('speciality', speciality);
module.exports = Speciality;