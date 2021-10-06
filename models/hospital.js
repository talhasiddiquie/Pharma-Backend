var mongoose = require("mongoose");
const { Schema } = mongoose;

var hospital = new Schema(
  {
    objectId: { type: String },
    // identifier: { type: String },
    // regionId: { type: String },
    // zoneId: { type: String },
    // cityId: { type: String },
    name: { type: String },
    abbreviation: { type: String },
    address: { type: String },
    phone: { type: String },
    // territoryId: { type: String },
    brickId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "brick",
      required: true,
    },
    isActive: { type: Boolean },
  },
  { timestamps: true }
);

const Hospitals = mongoose.model("hospital", hospital);
module.exports = Hospitals;
