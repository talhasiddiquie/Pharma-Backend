var mongoose = require('mongoose');
const { Schema } = mongoose;

var company = new Schema({
    objectId: { type: String },
    name: { type: String },
    abbreviation: { type: String },
    identifier: { type: String },
    isActive: { type: Boolean },
    createdBy: { type: String },
    updatedBy: { type: String },
    logoImg: { type: String },
    address: { type: String },
    contactPerson: { type: String },
    contactNumber: { type: String },
    contactDetail: { type: String },
});


const Companies = mongoose.model('company', company);
module.exports = Companies;