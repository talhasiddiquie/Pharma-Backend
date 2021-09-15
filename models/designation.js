var mongoose = require('mongoose');
const { Schema } = mongoose;

var designation = new Schema({
    objectId: { type: String },
    name: { type: String },
    type: { type: String },
    isActive: { type: Boolean }
});

const Designation = mongoose.model('designation', designation);
module.exports = Designation;