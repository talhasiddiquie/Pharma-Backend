var mongoose = require('mongoose');
const { Schema } = mongoose;

var city = new Schema({
    objectId: { type: String },
    name: { type: String },
    abbreviation: { type: String },
    identifier: { type: String },
    regionId: { type: String },
    provinceId: { type: String },
    isActive: { type: Boolean },
    createdBy: { type: String },
    updatedBy: { type: String },
});


const Cities = mongoose.model('city', city);
module.exports = Cities;