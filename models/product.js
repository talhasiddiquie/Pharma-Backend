var mongoose = require('mongoose');
const { Schema } = mongoose;

var product = new Schema({
    objectId: { type: String },
    name: { type: String },
    abbreviation: { type: String },
    identifier: { type: String },
    isActive: { type: Boolean },
    createdBy: { type: String },
    updatedBy: { type: String },
    molecule: { type: String },
    sellingLine: { type: String },
    company: { type: String },
    approvedIndication: { type: String },
    mrp: { type: String },
    tp: { type: String },
    discount: { type: String },
    sellingMessages: { type: String },
    additionalInfo: { type: String },
    files: { type: Array },
});

const Products = mongoose.model('product', product);
module.exports = Products;