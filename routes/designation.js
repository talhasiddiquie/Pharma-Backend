const express = require("express");
const router = express.Router();
const Designation = require("../models/designation");
const _ = require("underscore");

router.post("/postDesignation", async (req, res) => {
  const designation = await Designation.create(req.body);
  if (!designation) {
    res.status(400).send({ message: "something went wrong!" });
  } else {
    res.status(201).send(designation);
  }
});

router.get("/getDesignations", async (req, res) => {
  const designation = await Designation.find();
  if (!designation) {
    res.status(400).send({ message: "something went wrong!" });
  } else {
    res.status(201).send(designation);
  }
});

router.get("/getDesignation", async (req, res) => {
  if (req.body.id === null || req.body.id === undefined || req.body.id === "")
    res.status(403).send({ message: "no data received" });
  const designation = await Designation.findById(req.body.id);
  if (!designation) {
    res.status(400).send({ message: "something went wrong!" });
  } else {
    res.status(201).send(designation);
  }
});

router.post("/updateDesignation", async (req, res) => {
  if (
    req.body === null ||
    req.body === undefined ||
    req.body === "" ||
    req.body === {}
  )
    res.status(403).send({ message: "no data received" });
  const designation = await Designation.findByIdAndUpdate(
    req.body.id,
    req.body,
    { new: true }
  );
  if (!designation) {
    res.status(400).send({ message: "something went wrong!" });
  } else {
    res.status(201).send(designation);
  }
});

router.post("/getSpecificDesignationById", (req, res) => {
  let designationData = req.body;
  Designation.find({ _id: designationData.objectId }, function (err, data) {
    if (err) {
      res.send({
        code: 404,
        msg: "Something went wrong",
      });
    } else if (data) {
      res.send({
        code: 200,
        msg: "Designation Data",
        content: data,
      });
    }
  });
});

router.post("/deleteDesignation", async (req, res) => {
  var designationData = req.body;
  Designation.deleteOne(
    { _id: designationData.objectId },
    function (err, docs) {
      if (err) {
        res.json(err);
      } else {
        res.send({
          code: 200,
          msg: "Designation data delete successfully",
          content: docs,
        });
      }
    }
  );
});

module.exports = router;
