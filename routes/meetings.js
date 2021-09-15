const express = require("express");
const router = express.Router();
const Meeting = require('../models/meetings');
const _ = require("underscore");
const { route } = require("./user");
const { v4: uuidV4 } = require('uuid')

router.post('/postMeeting', (req, res) => {
    var meetingData = req.body;
    if (meetingData.objectId === '' || meetingData.objectId === undefined) {
        const postMeetingData = new Meeting({
            callMode: meetingData.callMode,
            callObjective: meetingData.callObjective,
            callDuartion: meetingData.callDuartion,
            colleagueId: meetingData.colleagueId,
            product: meetingData.product,
            survey: meetingData.survey,
            filesAndSurvey: meetingData.filesAndSurvey,
            eventCityName: meetingData.eventCityName,
            eventDescription: meetingData.eventDescription,
            eventRepDesignation: meetingData.eventRepDesignation,
            eventDoctorName: meetingData.eventDoctorName,
            eventDoctorTierId: meetingData.eventDoctorTierId,
            eventDoctorId: meetingData.eventDoctorId,
            eventEndDateTime: meetingData.eventEndDateTime,
            eventManagerId: meetingData.eventManagerId,
            eventRepName: meetingData.eventRepName,
            eventStartDateTime: meetingData.eventStartDateTime,
            eventTitle: meetingData.eventTitle,
            eventUserId: meetingData.eventUserId,
            eventId: meetingData.eventId,
            regionId: meetingData.regionId,
            zoneId: meetingData.zoneId,
            territoryId: meetingData.territoryId,
            checkInTime: meetingData.checkInTime,
            checkOutTime: meetingData.checkOutTime,
            visitDate: meetingData.visitDate,
            meetingDuration: meetingData.meetingDuration,
            hours: meetingData.hours,
            minutes: meetingData.minutes,
            seconds: meetingData.seconds,
            docSpecialityId: meetingData.docSpecialityId,
            docProvinceId: meetingData.docProvinceId,
            docHospitalId: meetingData.docHospitalId,
            docZoneId: meetingData.docZoneId,
            docTerritoryId: meetingData.docTerritoryId,
            meetingId: meetingData.meetingId,
            createdBy: meetingData.createdBy,
            updatedBy: meetingData.updatedBy,
            objectId: meetingData.objectId,
        })
        postMeetingData.save(function (err, data) {
            if (err) {
                res.send({
                    code: 500,
                    content: 'Internal Server Error',
                    msg: 'API not called properly'
                })
            }
            else if (data) {
                res.send({
                    code: 200,
                    msg: 'Data saved successfully',
                    content: data
                });
            }
        })
    }
    else if (meetingData.objectId !== '') {
        Meeting.findOneAndUpdate(
            { "_id": meetingData.objectId },
            { $set: _.omit(meetingData, '_id') },
            { new: true }
        ).then(() => {
            Meeting.find({ "_id": meetingData.objectId }, function (err, documents) {
                res.send({
                    error: err,
                    content: documents,
                    code: 200,
                    msg: 'data updated successfullly'
                });
            })
        }).catch(() => res.status(422).send({ msg: 'Internal server error' }));
    }
})

router.get('/getMeetings', (req, res) => {
    Meeting.find(function (err, data) {
        console.log(data, 'data');
        if (err) {
            res.send({
                code: 404,
                msg: 'Something went wrong'
            })
        }
        else if (data) {
            res.send({
                code: 200,
                msg: 'All Meeting Data',
                content: data
            })
        }
    })
})

router.post('/getSpecificMeetingById', (req, res) => {
    let meetingData = req.body;
    Meeting.find({ "_id": meetingData.objectId }, function (err, data) {
        if (err) {
            res.send({
                code: 404,
                msg: 'Something went wrong'
            })
        }
        else if (data) {
            res.send({
                code: 200,
                msg: 'Meeting Data',
                content: data
            })
        }
    })
})

router.post('/deleteMeeting', (req, res) => {
    var meetingData = req.body;
    Meeting.deleteOne({ "_id": meetingData.objectId },
        function (err, docs) {
            if (err) {
                res.json(err);
            }
            else {
                res.send({
                    code: 200,
                    msg: 'Meeting data delete successfully',
                    content: docs
                });
            }
        });
})

router.get('/meetingID', (req, res) => {
    res.send({
        code: 200,
        msg: 'Meeting Initiate ID',
        content: uuidV4()
    })
})
// route.get('/meetingID', (req, res) => {
//     res.send({
//         code: 200,
//         msg: 'Meeting Initiate ID',
//         constent: uuidV4()
//     })
// })

module.exports = router;
