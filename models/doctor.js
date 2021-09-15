var mongoose = require('mongoose');
const { Schema } = mongoose;

var doctor = new Schema({
    objectId: { type: String },
    name: { type: String },
    abbreviation: { type: String },
    identifier: { type: String },
    // type: { type: Object },
    pmdcRegistration: { type: String },
    phone: { type: String },
    email: { type: String },
    preferredDay: { type: Array },
    preferredTime: { type: String },
    district: { type: String },
    fee: { type: Number },
    potential: { type: String },
    lastValidatedAt: { type: Date, default: Date.now },
    representativeId: { type: String },
    regionId: { type: String },
    zoneId: { type: String },
    territoryId: { type: Object },
    qualificationId: { type: String },
    designationId: { type: String },
    specialityId: { type: String },
    hospitalId: { type: String },
    provinceId: { type: String },
    cityId: { type: String },
    cityName: { type: String },
    brickId: { type: String },
    imsBrickId: { type: String },
    tierId: { type: String },
    remarks: { type: String },
    status: { type: String },

    isActive: { type: Boolean },
    createdBy: { type: String },
    updatedBy: { type: String },

});


const Doctors = mongoose.model('doctor', doctor);
module.exports = Doctors;