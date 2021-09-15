var mongoose = require('mongoose');
const { Schema } = mongoose;

var representative = new Schema({
    objectId: { type: String },
    name: { type: String },
    identifier: { type: String },
    managerId: { type: String },
    designationDataStart: { type: Number },
    designationDataEnd: { type: Number },
    designationId: { type: Object },
    provinceId: { type: String },
    headquarterId: { type: String },
    regionId: { type: Array },
    zoneId: { type: Array },
    territoryId: { type: Array },
    phone: { type: String },
    email: { type: String },
    gender: { type: String },
    maritalStatus: { type: String },
    dateOfBirth: { type: Date },
    bloodGroupId: { type: String },
    workType: { type: String },
    sellingLine: { type: String },
    isActive: { type: Boolean },
    createdBy: { type: String },
    updatedBy: { type: String },
    password: { type: String },
    representativeId: { type: String }
});

const Representative = mongoose.model('representative', representative);

module.exports = Representative;