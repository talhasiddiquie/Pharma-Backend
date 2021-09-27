var mongoose = require("mongoose");
const { Schema } = mongoose;

var zone = new Schema(
  {
    objectId: { type: String },
    name: { type: String },
    abbreviation: { type: String },
    identifier: { type: String },
    regionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "region",
      required: true,
    },
    provinceId: { type: String },
    isActive: { type: Boolean },
  },
  { timestamps: true }
);

const Zone = mongoose.model("zone", zone);
module.exports = Zone;
