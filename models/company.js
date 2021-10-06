var mongoose = require("mongoose");
const { Schema } = mongoose;

var company = new Schema(
  {
    objectId: { type: String },
    name: { type: String },
    abbreviation: { type: String },
    identifier: { type: String },
    isActive: { type: Boolean },
    logoImg: { type: String },
    address: { type: String },
    contactPerson: { type: String },
    contactNumber: { type: String },
    contactDetail: { type: String },
  },
  { timestamps: true }
);

const Companies = mongoose.model("company", company);
module.exports = Companies;
