var mongoose = require('mongoose');
const { Schema } = mongoose;

var BloodGroup = new Schema({
    objectId: { type: String },
    name: { type: String },
    isActive: { type: Boolean },
});

const BloodGroups = mongoose.model('BloodGroup', BloodGroup);
module.exports = BloodGroups;