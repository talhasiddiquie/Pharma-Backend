var mongoose = require('mongoose');
const { Schema } = mongoose;

var workPlan = new Schema({
    objectId: { type: String },
    title: { type: String },
    description: { type: String },
    start: { type: Date },
    end: { type: Date },
    imsBrickId: { type: String },
    distriBrickId: { type: String },
    doctor: { type: String },
    doctor_id: { type: String },
    user_id: { type: String },
    doctorTierId: { type: String },
    isActive: { type: Boolean },
    status: { type: String },
    designation: { type: String },
    name: { type: String },
    designationId: { type: String },
    cityName: { type: String },
    doctorCounter: { type: Number },
    allDay: { type: Boolean },
    managerId: { type: String },
    statusEvent: { type: String },
    repRegions: { type: Array },
    repZones: { type: Array },
    repTerritories: { type: Array },
    specialityId: { type: String },
    provinceId: { type: String },
    hospitalId: { type: String },
    zoneId: { type: String },
    territoryId: { type: String },

    callDuartion: { type: Number },
    callMode: { type: String },
    callObjective: { type: String },
    colleagueId: { type: Array },
    filesAndSurvey: { type: Array },
    meetingId: { type: String },
    objectId: { type: String },
    product: { type: Array },
    survey: { type: Array },

});

const WorkPlan = mongoose.model('workPlan', workPlan);
module.exports = WorkPlan;