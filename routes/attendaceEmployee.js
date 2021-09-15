const express = require("express");
const router = express.Router();
const AttendaceEmployee = require('../models/attendaceEmployee');
const _ = require("underscore");

router.post('/postEmployeeAttendace', (req, res) => {
    var employeeAttendaceData = req.body;
    if (employeeAttendaceData.objectId === '' || employeeAttendaceData.objectId === undefined) {
        const postEmployeeAttendaceData = new AttendaceEmployee({
            cityName: employeeAttendaceData.cityName,
            designation: employeeAttendaceData.designation,
            designationId: employeeAttendaceData.designationId,
            empEmail: employeeAttendaceData.empEmail,
            employeeName: employeeAttendaceData.employeeName,
            employeeRole: employeeAttendaceData.employeeRole,
            employeeUserId: employeeAttendaceData.employeeUserId,
            startTime: employeeAttendaceData.startTime,
            status: employeeAttendaceData.status,
            todayDate: employeeAttendaceData.todayDate,
            zoneName: employeeAttendaceData.zoneName,
            endTime: employeeAttendaceData.endTime,
            objectId: employeeAttendaceData.objectId,
            cityId: employeeAttendaceData.cityId,
            zonesIds: employeeAttendaceData.zonesIds,

        })
        postEmployeeAttendaceData.save(function (err, data) {
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
    else if (employeeAttendaceData.objectId !== '') {
        AttendaceEmployee.findOneAndUpdate(
            { "_id": employeeAttendaceData.objectId },
            { $set: _.omit(employeeAttendaceData, '_id') },
            { new: true }
        ).then(() => {
            AttendaceEmployee.find({ "_id": employeeAttendaceData.objectId }, function (err, documents) {
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

router.get('/getEmployeesAttendaces', (req, res) => {
    AttendaceEmployee.find(function (err, data) {
        if (err) {
            res.send({
                code: 404,
                msg: 'Something went wrong'
            })
        }
        else if (data) {
            res.send({
                code: 200,
                msg: 'All Attendace Employee Data',
                content: data
            })
        }
    })
})

router.post('/getSpecificEmployeeAttendaceById', (req, res) => {
    let employeeAttendaceData = req.body;
    AttendaceEmployee.find({ "_id": employeeAttendaceData.objectId }, function (err, data) {
        if (err) {
            res.send({
                code: 404,
                msg: 'Something went wrong'
            })
        }
        else if (data) {
            res.send({
                code: 200,
                msg: 'Attendace Employee Data',
                content: data
            })
        }
    })
})

router.post('/deleteEmployeeAttendace', (req, res) => {
    var employeeAttendaceData = req.body;
    AttendaceEmployee.deleteOne({ "_id": employeeAttendaceData.objectId },
        function (err, docs) {
            if (err) {
                res.json(err);
            }
            else {
                res.send({
                    code: 200,
                    msg: 'EmployeeAttendace data delete successfully',
                    content: docs
                });
            }
        });
})

module.exports = router;
