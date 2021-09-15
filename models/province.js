var mongoose = require("mongoose");
const { Schema } = mongoose;

var province = new Schema({
  objectId: { type: String },
  name: { type: String },
  regionId: { type: Array },
  isActive: { type: Boolean },
});

const Province = mongoose.model("province", province);
module.exports = Province;
