var mongoose = require("mongoose");
const { Schema } = mongoose;

var city = new Schema(
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
    provinceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "province",
      required: true,
    },
    isActive: { type: Boolean },
  },
  { timestamps: true }
);

const Cities = mongoose.model("city", city);
module.exports = Cities;
