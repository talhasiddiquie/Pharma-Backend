const express = require("express");
const router = express.Router();
const Zone = require("../models/zone");
const _ = require("underscore");

router.post("/postZone", async (req, res) => {
  const zone = await Zone.create(req.body);
  if (!zone) {
    res
      .status(400)
      .send({ message: "something went wrong while creating a zone" });
  } else {
    res.status(201).send(zone);
  }
});

router.get("/getZones", async (req, res) => {
  const zone = await Zone.find().populate({
    path: "regionId",
    model: "region",
    populate: { path: "provinceId", model: "province" },
  });
  res.status(200).send(zone);
});
 
router.post("/getSpecificZoneById", (req, res) => {
  let zoneData = req.body;
  Zone.find({ _id: zoneData.objectId }, function (err, data) {
    if (err) {
      res.send({
        code: 404,
        msg: "Something went wrong",
      });
    } else if (data) {
      res.send({
        code: 200,
        msg: "Zone Data",
        content: data,
      });
    }
  });
});

router.post("/getZone", async (req, res) => {
  const zone = await Zone.findById(req.body.id).populate({
    path: "regionId",
    model: "region",
    populate: { path: "provinceId", model: "province" },
  });
  if (!zone) {
    res.status(401).send("wrong id , or no such record");
  } else {
    res.status(200).send(zone);
  }
});

router.post("/deleteZone", async (req, res) => {
  const zone = await Zone.findByIdAndDelete(req.body.id);
  if (!zone) {
    res.status(401).send("wrong id , or no such record");
  } else {
    res.status(200).send(zone);
  }
});
router.post("/updateZone", async (req, res) => {
  const zone = await Zone.findByIdAndUpdate(req.body.id, req.body, {
    new: true,
  });
  if (!zone) {
    res.status(401).send("wrong id , or no such record");
  } else {
    res.status(200).send(zone);
  }
});
module.exports = router;
