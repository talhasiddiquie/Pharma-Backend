var mongoose = require('mongoose');
const { Schema } = mongoose;

var attendaceEmployee = new Schema({
    cityName: { type: String },
    designation: { type: String },
    designationId: { type: String },
    empEmail: { type: String },
    employeeName: { type: String },
    employeeRole: { type: String },
    employeeUserId: { type: String },
    startTime: { type: String },
    status: { type: String },
    todayDate: { type: String },
    zoneName: { type: String },
    endTime: { type: String },
    objectId: { type: String },

    cityId: { type: String },
    zonesIds: { type: Array },

});

const AttendaceEmployee = mongoose.model('attendaceEmployee', attendaceEmployee);
module.exports = AttendaceEmployee;