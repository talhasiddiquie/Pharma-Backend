var mongoose = require("mongoose");
const { Schema } = mongoose;

var bricks = new Schema(
  {
    objectId: { type: String },
    name: { type: String },
    abbreviation: { type: String },
    identifier: { type: String },
    brickType: { type: String },
    // regionId: { type: String },
    // zoneId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "zone",
    //   required: true,
    // },
    territoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "territory",
      required: true,
    },
    isActive: { type: Boolean },
  },
  { timestamps: true }
);

const Bricks = mongoose.model("brick", bricks);
module.exports = Bricks;
