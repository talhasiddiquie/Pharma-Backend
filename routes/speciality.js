const express = require("express");
const router = express.Router();
const Speciality = require("../models/speciality");
const _ = require("underscore");

router.post("/postSpeciality", async (req, res) => {
  const result = await Speciality.create(req.body);
  res.status(201).send(result);
});

router.get("/getSpecialities", async (req, res) => {
  const result = await Speciality.find();
  res.status(200).send(result);
});

router.post("/getSpeciality", async (req, res) => {
  const result = await Speciality.findById(req.body.id);
  res.status(200).send(result);
});

router.post("/deleteSpeciality", async (req, res) => {
  const result = await Speciality.findByIdAndDelete(req.body.id);
  res.status(200).send(result);
});

router.post("/updateSpeciality", async (req, res) => {
  const result = await Speciality.findByIdAndUpdate(req.body.id, req.body, {
    new: true,
  });
  res.status(200).send(result);
});

router.post("/getSpecificSpecialityById", (req, res) => {
  let specialityData = req.body;
  Speciality.find({ _id: specialityData.objectId }, function (err, data) {
    if (err) {
      res.send({
        code: 404,
        msg: "Something went wrong",
      });
    } else if (data) {
      res.send({
        code: 200,
        msg: "Speciality Data",
        content: data,
      });
    }
  });
});
module.exports = router;
