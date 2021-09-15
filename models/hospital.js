var mongoose = require('mongoose');
const { Schema } = mongoose;

var hospital = new Schema({
    objectId: { type: String },
    identifier: { type: String },
    regionId: { type: String },
    zoneId: { type: String },
    cityId: { type: String },
    name: { type: String },
    abbreviation: { type: String },
    address: { type: String },
    phone: { type: String },
    territoryId: { type: String },
    brickId: { type: String },
    isActive: { type: Boolean },
    createdBy: { type: String },
    updatedBy: { type: String },
});


const Hospitals = mongoose.model('hospital', hospital);
module.exports = Hospitals;