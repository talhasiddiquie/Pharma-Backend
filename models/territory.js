var mongoose = require('mongoose');
const { Schema } = mongoose;

var territory = new Schema({
    objectId: { type: String },
    name: { type: String },
    abbreviation: { type: String },
    identifier: { type: String },
    regionId: { type: String },
    zoneId: { type: String },
    provinceId: { type: String },
    cityId: { type: Array },
    isActive: { type: Boolean },
    createdBy: { type: String },
    updatedBy: { type: String },
});

const Territory = mongoose.model('territory', territory);
module.exports = Territory;