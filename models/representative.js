var mongoose = require("mongoose");
const { Schema } = mongoose;

var representative = new Schema(
  {
    objectId: { type: String },
    name: { type: String },
    identifier: { type: String },
    // managerId: { type: String },
    designationDataStart: { type: Number },
    designationDataEnd: { type: Number },
    designationId: { type: mongoose.Schema.Types.ObjectId, ref: "designation" },
    provinceId: { type: mongoose.Schema.Types.ObjectId, ref: "province" },
    headquarterId: { type: mongoose.Schema.Types.ObjectId },
    regionId: [{ type: mongoose.Schema.Types.ObjectId, ref: "region" }],
    zoneId: [{ type: mongoose.Schema.Types.ObjectId, ref: "zone" }],
    territoryId: [{ type: mongoose.Schema.Types.ObjectId, ref: "territory" }],
    phone: { type: String },
    email: { type: String },
    gender: { type: String },
    maritalStatus: { type: String },
    dateOfBirth: { type: Date },
    bloodGroupId: { type: mongoose.Schema.Types.ObjectId, ref: "bloodGroup" },
    workType: { type: String },
    company: { type: mongoose.Schema.Types.ObjectId, ref: "company" },
    isActive: { type: Boolean },
    password: { type: String },
    representativeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "representative",
    },
  },
  { timestamps: true }
);

const Representative = mongoose.model("representative", representative);

module.exports = Representative;
