const express = require("express");
const router = express.Router();
const Region = require("../models/region");
const _ = require("underscore");
const ApiError = require("../utils/APIError");

router.post("/postRegion", async (req, res) => {
  console.log(req.body, "<====creating region , body");
  const region = await Region.create(req.body);
  if (!region) {
    res.status(400).send({ message: "something went wrong!" });
  }
  res.status(201).send(region);
});

router.get("/getRegions", async (req, res) => {
  const regions = await Region.find().populate("provinceId");
  res.status(200).send(regions);
});

router.post("/getSpecificRegionById", (req, res) => {
  let regionData = req.body;
  Region.find({ _id: regionData.objectId }, function (err, data) {
    if (err) {
      res.send({
        code: 404,
        msg: "Something went wrong",
      });
    } else if (data) {
      res.send({
        code: 200,
        msg: "Region Data",
        content: data,
      });
    }
  });
});

router.post("/deleteRegion", async (req, res) => {
  console.log(req.body);
  const ID = req.body.id;
  const region = await Region.findByIdAndDelete(ID);
  if (!region) {
    res.status(201).send("no such record");
  } else {
    res.status(200).send(region);
  }
});

router.post("/getRegion", async (req, res) => {
  const ID = req.body.id;
  const region = await findRegionById(ID);
  if (!region) {
    res.status(201).send("no such record");
  } else {
    res.status(200).send(region);
  }
});

router.post("/updateRegion", async (req, res) => {
  const ID = req.body.id;
  const region = await Region.findByIdAndUpdate(ID, req.body, { new: true });
  if (!region) {
    res.status(201).send("no such record to be updated");
  } else {
    res.status(200).send(region);
  }
});

const findRegionById = async (id) => {
  const province = await Region.findById(id);
  return province;
};

module.exports = router;
