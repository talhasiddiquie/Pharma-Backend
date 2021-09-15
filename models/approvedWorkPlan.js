var mongoose = require('mongoose');
const { Schema } = mongoose;

var approvedWorkPlan = new Schema({
    objectId: { type: String },
    endDates: { type: Array },
    startDates: { type: Array },
    designation: { type: String },
    designationId: { type: String },
    doctorsId: { type: Array },
    doctorsName: { type: Array },
    employeeId: { type: String },
    employeeName: { type: String },
    eventsIds: { type: Array },
    month: { type: String },
    year: { type: String },
    status: { type: String },
    tier1Per: { type: Number },
    tier2Per: { type: Number },
    tier3Per: { type: Number },
    totalPer: { type: Number },
    isActive: { type: Boolean },
    managerId: { type: String },
    regionId: { type: Array },
    zoneId: { type: Array },
    territoryId: { type: Array },
    t1Docs: { type: Number },
    t2Docs: { type: Number },
    t3Docs: { type: Number },
});

const ApprovedWorkPlan = mongoose.model('approvedWorkPlan', approvedWorkPlan);
module.exports = ApprovedWorkPlan;