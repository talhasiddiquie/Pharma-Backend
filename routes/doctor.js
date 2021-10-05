const express = require("express");
const router = express.Router();
const Doctor = require("../models/doctor");
const _ = require("underscore");
const doctorMail = require("../middlewares/doctormail");
const { populate } = require("../models/doctor");

router.post("/postDoctor", async (req, res) => {
  const doctor = await Doctor.create(req.body);
  res.status(201).send(doctor);
});

router.get("/getDoctors", async (req, res) => {
  const result = await Doctor.find()
    .populate("representativeId")
    .populate("regionId")
    .populate("zoneId")
    .populate("territoryId")
    .populate("qualificationId")
    .populate("designationId")
    .populate("specialityId")
    .populate("hospitalId")
    .populate("provinceId")
    .populate("cityId")
    .populate("brickId")
    .populate("tierId");
  res.status(200).send(result);
});

router.post("/getDoctor", async (req, res) => {
  const result = await Doctor.findById(req.body.id);
  res.status(200).send(result);
});

router.post("/deleteDoctor", async (req, res) => {
  const result = await Doctor.findByIdAndDelete(req.body.id);
  res.status(200).send(result);
});

router.post("/updateDoctor", async (req, res) => {
  const result = await Doctor.findByIdAndUpdate(req.body.id, req.body, {
    new: true,
  });
  res.status(200).send(result);
});

router.post("/getSpecificDoctorByemail", (req, res) => {
  let doctorData = req.body;
  Doctor.find({ email: doctorData.email }, function (err, data) {
    if (err) {
      res.send({
        code: 404,
        msg: "Something went wrong",
      });
    } else if (data) {
      res.send({
        code: 200,
        msg: "Doctor Data",
        content: data,
      });
    }
  });
});

router.get("/:id", (req, res) => {
  let { id } = req.params;
  console.log(req.params, "reqwuest params");
  Doctor.find({ _id: id }, function (err, data) {
    // console.log(err, "error");
    if (err) {
      res.send({
        code: 404,
        msg: "Something went wrong",
      });
    } else if (data) {
      res.send({
        code: 200,
        msg: "Doctor Data",
        content: data,
      });
    }
  });
});

router.post("/sendEmail", (req, res) => {
  let meetingData = req.body;
  // console.log(meetingData, "email api");
  doctorMail(meetingData)
    .then((response) => {
      console.log(response, "response");
      // return res.status(200).json({ success: true, data: response });
    })
    .catch((err) => {
      console.log(err, "err in email send");
      return res.status(400).json({ error: "Error Occured" });
    });
});

router.post("/getDoctorsByCity", (req, res) => {
  let doctorData = req.body;
  Doctor.find({ cityId: doctorData.objectId }, function (err, data) {
    if (err) {
      res.send({
        code: 404,
        msg: "Something went wrong",
      });
    } else if (data) {
      res.send({
        code: 200,
        msg: "Doctors Data",
        content: data,
      });
    }
  });
});

// router.post('/doctorCounts', (req, res) => {
//     let doctorData = req.body;
//     Doctor.find({ "cityId": doctorData.objectId }, function (err, data) {
//         if (err) {
//             res.send({
//                 code: 404,
//                 msg: 'Something went wrong'
//             })
//         }
//         else if (data) {
//             res.send({
//                 code: 200,
//                 msg: 'Doctors Data',
//                 content: data
//             })
//         }
//     })
// })

router.post("/deleteDoctor", (req, res) => {
  var doctorData = req.body;
  Doctor.deleteOne({ _id: doctorData.objectId }, function (err, docs) {
    if (err) {
      res.json(err);
    } else {
      res.send({
        code: 200,
        msg: "Doctor data delete successfully",
        content: docs,
      });
    }
  });
});

module.exports = router;
