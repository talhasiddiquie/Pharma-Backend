const express = require("express");
const router = express.Router();
const ApprovedWorkPlan = require('../models/approvedWorkPlan');
const _ = require("underscore");

router.post('/postApprovedWorkPlan', (req, res) => {
    var workPlanData = req.body;
    if (workPlanData.objectId === '' || workPlanData.objectId === undefined) {
        const postWorkPlanData = new ApprovedWorkPlan({
            endDates: workPlanData.endDates,
            startDates: workPlanData.startDates,
            designation: workPlanData.designation,
            designationId: workPlanData.designationId,
            doctorsId: workPlanData.doctorsId,
            doctorsName: workPlanData.doctorsName,
            employeeId: workPlanData.employeeId,
            employeeName: workPlanData.employeeName,
            eventsIds: workPlanData.eventsIds,
            month: workPlanData.month,
            year: workPlanData.year,
            status: workPlanData.status,
            tier1Per: workPlanData.tier1Per,
            status: workPlanData.status,
            tier2Per: workPlanData.tier2Per,
            tier3Per: workPlanData.tier3Per,
            totalPer: workPlanData.totalPer,
            isActive: workPlanData.isActive,
            managerId: workPlanData.managerId,
            regionId: workPlanData.regionId,
            zoneId: workPlanData.zoneId,
            territoryId: workPlanData.territoryId,
            t1Docs: workPlanData.t1Docs,
            t2Docs: workPlanData.t2Docs,
            t3Docs: workPlanData.t3Docs,

        })
        postWorkPlanData.save(function (err, data) {
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
    else if (workPlanData.objectId !== '') {
        ApprovedWorkPlan.findOneAndUpdate(
            { "_id": workPlanData.objectId },
            { $set: _.omit(workPlanData, '_id') },
            { new: true }
        ).then(() => {
            ApprovedWorkPlan.find({ "_id": workPlanData.objectId }, function (err, documents) {
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

router.get('/getApprovedWorkPlans', (req, res) => {
    ApprovedWorkPlan.find(function (err, data) {
        if (err) {
            res.send({
                code: 404,
                msg: 'Something went wrong'
            })
        }
        else if (data) {
            res.send({
                code: 200,
                msg: 'All ApprovedWorkPlan Data',
                content: data
            })
        }
    })
})

module.exports = router;