var mongoose = require("mongoose");
const { Schema } = mongoose;

var province = new Schema({
  objectId: { type: String, required: true },
  name: { type: String, required: true },
  isActive: { type: Boolean },
  company: { type: mongoose.Schema.Types.ObjectId, ref: "company" },
});

const Province = mongoose.model("province", province);
module.exports = Province;
