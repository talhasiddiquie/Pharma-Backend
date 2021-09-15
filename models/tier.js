var mongoose = require('mongoose');
const { Schema } = mongoose;

var tier = new Schema({
    objectId: { type: String },
    name: { type: String },
    isActive: { type: Boolean }
});

const Tier = mongoose.model('tier', tier);
module.exports = Tier;