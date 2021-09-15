const express = require("express");
const router = express.Router();
const WorkPlan = require("../models/workPlan");
const _ = require("underscore");

router.post("/postWorkPlan", (req, res) => {
  var workPlanData = req.body;
  if (workPlanData.objectId === "" || workPlanData.objectId === undefined) {
    const postWorkPlanData = new WorkPlan({
      title: workPlanData.title,
      description: workPlanData.description,
      start: workPlanData.start,
      end: workPlanData.end,
      imsBrickId: workPlanData.imsBrickId,
      distriBrickId: workPlanData.distriBrickId,
      doctor: workPlanData.doctor,
      doctor_id: workPlanData.doctor_id,
      user_id: workPlanData.user_id,
      doctorTierId: workPlanData.doctorTierId,
      isActive: workPlanData.isActive,
      status: workPlanData.status,
      designation: workPlanData.designation,
      name: workPlanData.name,
      designationId: workPlanData.designationId,
      cityName: workPlanData.cityName,
      doctorCounter: workPlanData.doctorCounter,
      allDay: workPlanData.allDay,
      managerId: workPlanData.managerId,
      statusEvent: workPlanData.statusEvent,
      repRegions: workPlanData.repRegions,
      repZones: workPlanData.repZones,
      repTerritories: workPlanData.repTerritories,
      specialityId: workPlanData.specialityId,
      provinceId: workPlanData.provinceId,
      hospitalId: workPlanData.hospitalId,
      zoneId: workPlanData.zoneId,
      territoryId: workPlanData.territoryId,

      callDuartion: workPlanData.callDuartion,
      callMode: workPlanData.callMode,
      callObjective: workPlanData.callObjective,
      colleagueId: workPlanData.colleagueId,
      filesAndSurvey: workPlanData.filesAndSurvey,
      meetingId: workPlanData.meetingId,
      objectId: workPlanData.objectId,
      product: workPlanData.product,
      survey: workPlanData.survey,
    });
    postWorkPlanData.save(function (err, data) {
      if (err) {
        res.send({
          code: 500,
          content: "Internal Server Error",
          msg: "API not called properly",
        });
      } else if (data) {
        res.send({
          code: 200,
          msg: "Data saved successfully",
          content: data,
        });
      }
    });
  } else if (workPlanData.objectId !== "") {
    WorkPlan.findOneAndUpdate(
      { _id: workPlanData.objectId },
      { $set: _.omit(workPlanData, "_id") },
      { new: true }
    )
      .then(() => {
        WorkPlan.find(
          { _id: workPlanData.objectId },
          function (err, documents) {
            res.send({
              error: err,
              content: documents,
              code: 200,
              msg: "data updated successfullly",
            });
          }
        );
      })
      .catch(() => res.status(422).send({ msg: "Internal server error" }));
  }
});

router.get("/getWorkPlans", (req, res) => {
  WorkPlan.find(function (err, data) {
    if (err) {
      res.send({
        code: 404,
        msg: "Something went wrong",
      });
    } else if (data) {
      res.send({
        code: 200,
        msg: "All WorkPlan Data",
        content: data,
      });
    }
  });
});


// db.specificMonthDemo.aggregate([
//     {
//         $project: {
//             StudentName: 1, StudentDateOfBirth:
//                 { $month: '$StudentDateOfBirth' }
//         }
//     },
//     { $match: { StudentDateOfBirth: 01 } }])
//     .pretty();
router.get("/countsDoctors", (req, res) => {
  let workPlanData = req.body;
  console.log(workPlanData, 'workPlanData');
  WorkPlan.aggregate(
    [
      {
        $group: {
          _id: "$user_id",
          // doctor_id:"$doctor_id",
          data: { $push: "$$ROOT" },
          count: { $sum: 1 },
        },
        // $match: { user_id: workPlanData.objectId },
        // $group: {
        //     _id: '$doctor_id',
        //     // userId: { "$first": '$user_id' },
        //     count: {
        //         $sum: 1
        //     }
        // },
      },

      // { "$match": { "is_processed": false, } },
      // {
      //     "$lookup": {
      //         "from": "scoreboards",
      //         "let": { "doctor_id": "$doctor_id", "startDate": "$start", "endDate": "$end" },
      //         "pipeline": [
      //             {
      //                 "$match": {
      //                     "$expr": {
      //                         "$and": [
      //                             { "$eq": ["$doctor_id", "$$doctor_id"] },
      //                             { "$gte": ["$date", "$$startDate"] },
      //                             { "$lt": ["$date", "$$endDate"] }
      //                         ]
      //                     }
      //                 }
      //             }
      //         ],
      //         "as": "scoreboards"
      //     }
      // }
    ],
    function (e, count) {
      // console.log(count, 'count');
      if (e) {
        res.send({
          code: 404,
          success: false,
          message: e.message,
        });
      } else if (count) {
        const response = {
          code: 200,
          success: true,
          doctorCount: count,
        };
        res.send(response);
      }
      // if (e) {
      //     res.status(e.code || statusCodes.serverError).send({ success: false, message: e.message });
      // }
      // const agg = [
      //     {
      //       $match :
      //       {
      //         AreaName: _AreaName,
      //         Day : _Day,
      //         Month: _Month,
      //         Year: _Year
      //       }
      //   }]
    }
  );
  // WorkPlan.find({ "user_id": workPlanData.objectId }, function (err, data) {
  //     if (err) {
  //         res.send({
  //             code: 404,
  //             msg: 'Something went wrong'
  //         })
  //     }
  //     else if (data) {
  //         res.send({
  //             code: 200,
  //             msg: 'User Add WorkPlan Data',
  //             content: data
  //         })
  //     }
  // })
});


router.get("/:id", (req, res) => {
  const { id } = req.params;
  console.log('api hit');

  WorkPlan.find({ meetingId: id }, function (err, data) {
    if (err) {
      res.send({
        code: 404,
        msg: "Wrong meeting id",
      });
    } else if (data) {
      res.send({
        code: 200,
        msg: "Meting Data",
        content: data,
      });
    }
  });
});

router.post("/getSpecificWorkPlanByUserId", (req, res) => {
  let workPlanData = req.body;
  WorkPlan.find({ meetingId: workPlanData.objectId }, function (err, data) {
    if (err) {
      res.send({
        code: 404,
        msg: "Something went wrong",
      });
    } else if (data) {
      res.send({
        code: 200,
        msg: "User Add WorkPlan Data",
        content: data,
      });
    }
  });
});

module.exports = router;
