const express = require("express");
const router = express.Router();
const BloodGroup = require("../models/blood-group");
const _ = require("underscore");

router.post("/postBloodGroup", async (req, res) => {
  if (req.body === null || req.body === undefined)
    res.status(403).send({ message: "no data received" });
  const blood = await BloodGroup.create(req.body);
  if (!blood) {
    res.status(400).send({ message: "something went wrong!" });
  } else {
    res.status(201).send(blood);
  }
});

router.get("/getBloodGroups", async (req, res) => {
  //   if (req.body === null || req.body === undefined)
  //     res.status(403).send({ message: "no data received" });
  const blood = await BloodGroup.find();
  if (!blood) {
    res.status(400).send({ message: "something went wrong!" });
  } else {
    res.status(201).send(blood);
  }
});
router.post("/getBloodGroup", async (req, res) => {
  if (req.body.id === null || req.body.id === undefined)
    res.status(403).send({ message: "no data received" });
  else {
    const blood = await BloodGroup.findById(req.body.id);
    if (!blood) {
      res.status(400).send({ message: "something went wrong!" });
    } else {
      res.status(201).send(blood);
    }
  }
});

router.post("/deleteBloodGroup", async (req, res) => {
  const blood = await BloodGroup.findByIdAndDelete(req.body.id);
  if (!blood) {
    res.status(400).send({ message: "something went wrong!" });
  } else {
    res.status(201).send(blood);
  }
});

router.post("/updateBloodGroup", async (req, res) => {
  const blood = await BloodGroup.findByIdAndUpdate(req.body.id, req.body, {
    new: true,
  });
  if (!blood) {
    res.status(400).send({ message: "something went wrong!" });
  } else {
    res.status(201).send(blood);
  }
});

// router.post("/getSpecificBloodGroupById", (req, res) => {
//   let bloodGroupData = req.body;
//   BloodGroup.find({ _id: bloodGroupData.objectId }, function (err, data) {
//     if (err) {
//       res.send({
//         code: 404,
//         msg: "Something went wrong",
//       });
//     } else if (data) {
//       res.send({
//         code: 200,
//         msg: "Blood Group Data",
//         content: data,
//       });
//     }
//   });
// });

// router.post("/deleteBloodGroup", (req, res) => {
//   var bloodGroupData = req.body;
//   BloodGroup.deleteOne({ _id: bloodGroupData.objectId }, function (err, docs) {
//     if (err) {
//       res.json(err);
//     } else {
//       res.send({
//         code: 200,
//         msg: "Blood Group data delete successfully",
//         content: docs,
//       });
//     }
//   });
// });

module.exports = router;
