var mongoose = require('mongoose');
const { Schema } = mongoose;

var bricks = new Schema({
    objectId: { type: String },
    name: { type: String },
    abbreviation: { type: String },
    identifier: { type: String },
    brickType: { type: String },
    regionId: { type: String },
    zoneId: { type: String },
    territoryId: { type: String },
    isActive: { type: Boolean },
    createdBy: { type: String },
    updatedBy: { type: String },
});


const Bricks = mongoose.model('bricks', bricks);
module.exports = Bricks;