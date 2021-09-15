var mongoose = require('mongoose');
const { Schema } = mongoose;

var selling_pitch = new Schema({
    objectId: { type: String },
    identifier: { type: String },
    productId: { type: String },
    callOpening: { type:String },
    callProbing: { type: String },
    problemSetup: { type: String },
    keyMessages: { type: String },
    gainingCommitment: { type: String },
    isActive: { type: Boolean },
    createdBy: { type: String },
    updatedBy: { type: String },
});

const SellingPitch = mongoose.model('selling_pitch', selling_pitch);
module.exports = SellingPitch;