var mongoose = require('mongoose');
const { Schema } = mongoose;

var zone = new Schema({
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

const Zone = mongoose.model('zone', zone);
module.exports = Zone;