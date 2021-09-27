var mongoose = require("mongoose");
const { Schema } = mongoose;

var region = new Schema({
  objectId: { type: String },
  name: { type: String },
  abbreviation: { type: String },
  identifier: { type: String },
  provinceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "province",
    required: true,
  },
  isActive: { type: Boolean },
  createdBy: { type: String },
  updatedBy: { type: String },
});

const Regions = mongoose.model("region", region);
module.exports = Regions;
