const express = require("express");
const router = express.Router();
const Doctor = require("../models/doctor");
const _ = require("underscore");
const doctorMail = require("../middlewares/doctormail");

router.post("/postDoctor", (req, res) => {
  var doctorData = req.body;

  if (doctorData.objectId === "" || doctorData.objectId === undefined) {
    const postDoctorData = new Doctor({
      name: doctorData.name,
      abbreviation: doctorData.abbreviation,
      identifier: doctorData.identifier,
      isActive: doctorData.isActive,
      createdBy: doctorData.createdBy,
      updatedBy: doctorData.updatedBy,
      pmdcRegistration: doctorData.pmdcRegistration,
      phone: doctorData.phone,
      email: doctorData.email,
      preferredDay: doctorData.preferredDay,
      preferredTime: doctorData.preferredTime,
      district: doctorData.district,
      fee: doctorData.fee,
      potential: doctorData.potential,
      lastValidatedAt: doctorData.lastValidatedAt,
      representativeId: doctorData.representativeId,
      regionId: doctorData.regionId,
      zoneId: doctorData.zoneId,
      territoryId: doctorData.territoryId,
      qualificationId: doctorData.qualificationId,
      designationId: doctorData.designationId,
      specialityId: doctorData.specialityId,
      hospitalId: doctorData.hospitalId,
      provinceId: doctorData.provinceId,
      cityId: doctorData.cityId,
      cityName: doctorData.cityName,
      brickId: doctorData.brickId,
      imsBrickId: doctorData.imsBrickId,
      tierId: doctorData.tierId,
      remarks: doctorData.remarks,
      status: doctorData.status,
    });
    postDoctorData.save(function (err, data) {
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
  } else if (doctorData.objectId !== "") {
    Doctor.findOneAndUpdate(
      { _id: doctorData.objectId },
      { $set: _.omit(doctorData, "_id") },
      { new: true }
    )
      .then(() => {
        Doctor.find({ _id: doctorData.objectId }, function (err, documents) {
          res.send({
            error: err,
            content: documents,
            code: 200,
            msg: "data updated successfullly",
          });
        });
      })
      .catch(() => res.status(422).send({ msg: "Internal server error" }));
  }
});

router.get("/getDoctor", (req, res) => {
  Doctor.find(function (err, data) {
    if (err) {
      res.send({
        code: 404,
        msg: "Something went wrong",
      });
    } else if (data) {
      res.send({
        code: 200,
        msg: "All Doctor Data",
        content: data,
      });
    }
  });
});

router.get("/:email", (req, res) => {
  const { email } = req.params;
  Doctor.find({ email: email }, function (err, data) {
    console.log(err, "error");
    if (err) {
      res.send({
        code: 404,
        msg: "Doctor does not exist",
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

router.post("/getSpecificDoctorById", (req, res) => {
  let doctorData = req.body;
  Doctor.find({ _id: doctorData.objectId }, function (err, data) {
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
  console.log(req.params , "reqwuest params");
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
