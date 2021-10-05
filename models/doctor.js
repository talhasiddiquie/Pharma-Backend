var mongoose = require("mongoose");
const { Schema } = mongoose;

var doctor = new Schema(
  {
    objectId: { type: String },
    name: { type: String },
    abbreviation: { type: String },
    identifier: { type: String },
    // type: { type: Object },
    pmdcRegistration: { type: String },
    phone: { type: String },
    email: { type: String },
    preferredDay: { type: Array },
    preferredTime: { type: String },
    district: { type: String },
    fee: { type: Number },
    potential: { type: String },
    lastValidatedAt: { type: Date, default: Date.now },
    representativeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "representative",
    },
    regionId: { type: mongoose.Schema.Types.ObjectId, ref: "region" },
    zoneId: { type: mongoose.Schema.Types.ObjectId, ref: "zone" },
    territoryId: { type: mongoose.Schema.Types.ObjectId, ref: "territory" },
    qualificationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "qualification",
    },
    designationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "designation",
    },
    specialityId: { type: mongoose.Schema.Types.ObjectId, ref: "speciality" },
    hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: "hospital" },
    provinceId: { type: mongoose.Schema.Types.ObjectId, ref: "province" },
    cityId:  { type: mongoose.Schema.Types.ObjectId, ref: "city" },
    cityName: { type: String },
    brickId: { type: mongoose.Schema.Types.ObjectId, ref: "brick" },
    imsBrickId: { type: String },
    tierId: { type: mongoose.Schema.Types.ObjectId, ref: "tier" },
    remarks: { type: String },
    status: { type: String },
    isActive: { type: Boolean },
  },
  { timestamps: true }
);

const Doctors = mongoose.model("doctor", doctor);
module.exports = Doctors;
