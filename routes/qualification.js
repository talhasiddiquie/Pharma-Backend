const express = require("express");
const router = express.Router();
const Qualification = require("../models/qualification");
const _ = require("underscore");

router.post("/postQualification", async (req, res) => {
  const result = await Qualification.create(req.body);
  res.status(201).send(result);
});

router.get("/getQualifications", async (req, res) => {
  const result = await Qualification.find();
  res.status(200).send(result);
});

router.post("/getQualification", async (req, res) => {
  const result = await Qualification.findById(req.body.id);
  res.status(200).send(result);
});

router.post("/deleteQualification", async (req, res) => {
  const result = await Qualification.findByIdAndDelete(req.body.id);
  res.status(200).send(result);
});

router.post("/updateQualification", async (req, res) => {
  const result = await Qualification.findByIdAndUpdate(req.body.id, req.body, {
    new: true,
  });
  res.status(200).send(result);
});

router.post("/getSpecificQualificationById", (req, res) => {
  let qualificationData = req.body;
  Qualification.find({ _id: qualificationData.objectId }, function (err, data) {
    if (err) {
      res.send({
        code: 404,
        msg: "Something went wrong",
      });
    } else if (data) {
      res.send({
        code: 200,
        msg: "Qualification Data",
        content: data,
      });
    }
  });
});

router.post("/deleteQualification", (req, res) => {
  var qualificationData = req.body;
  Qualification.deleteOne(
    { _id: qualificationData.objectId },
    function (err, docs) {
      if (err) {
        res.json(err);
      } else {
        res.send({
          code: 200,
          msg: "Qualification data delete successfully",
          content: docs,
        });
      }
    }
  );
});

module.exports = router;
