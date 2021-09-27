var mongoose = require("mongoose");
const { Schema } = mongoose;

var territory = new Schema(
  {
    objectId: { type: String },
    name: { type: String },
    abbreviation: { type: String },
    identifier: { type: String },
    regionId: { type: String },
    zoneId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "zone",
      required: true,
    },
    isActive: { type: Boolean },
  },
  { timestamps: true }
);

const Territory = mongoose.model("territory", territory);
module.exports = Territory;
