var mongoose = require('mongoose');
const { Schema } = mongoose;

var meetings = new Schema({
    callMode: { type: String },
    callObjective: { type: String },
    callDuartion: { type: Number },
    colleagueId: { type: Array },
    product: { type: Array },
    survey: { type: Array },
    filesAndSurvey: { type: Array },
    eventCityName: { type: String },
    eventDescription: { type: String },
    eventRepDesignation: { type: String },
    eventDoctorName: { type: String },
    eventDoctorTierId: { type: String },
    eventDoctorId: { type: String },
    eventEndDateTime: { type: String },
    eventManagerId: { type: String },
    eventRepName: { type: String },
    eventStartDateTime: { type: String },
    eventTitle: { type: String },
    eventUserId: { type: String },
    eventId: { type: String },
    regionId: { type: Array },
    zoneId: { type: Array },
    territoryId: { type: Array },
    checkInTime: { type: String },
    checkOutTime: { type: String },
    visitDate: { type: String },
    meetingDuration: { type: String },
    hours: { type: String },
    minutes: { type: String },
    seconds: { type: String },
    docSpecialityId: { type: String },
    docProvinceId: { type: String },
    docHospitalId: { type: String },
    docZoneId: { type: String },
    docTerritoryId: { type: String },
    meetingId: { type: String },

    createdBy: { type: String },
    updatedBy: { type: String },
    objectId: { type: String },
});


const Meetings = mongoose.model('meetings', meetings);
module.exports = Meetings;