const express = require("express");
const router = express.Router();
const Cities = require("../models/city");
const _ = require("underscore");
const verifyToken = require("../middlewares/verifyToken");

router.post("/postCity", async (req, res) => {
  console.log(req.body, "<====creating city");
  const city = await Cities.create(req.body);
  if (!city) {
    res.status(400).send({ message: "something went wrong!" });
  }
  res.status(201).send(city);
});
router.post("/getCity", async (req, res) => {
  const city = await Cities.findById(req.body.id)
    .populate("regionId")
    .populate("provinceId");
  if (!city) {
    res.status(400).send({ message: "something went wrong!" });
  } else {
    res.status(201).send(city);
  }
});
router.get("/getCities", async (req, res) => {
  console.log(req.body, "<====getting cities , body");
  const city = await Cities.find().populate("regionId").populate("provinceId");
  if (!city) {
    res.status(400).send({ message: "something went wrong!" });
  }
  res.status(201).send(city);
});

router.post("/getSpecificCityById", (req, res) => {
  let cityData = req.body;
  Cities.find({ _id: cityData.objectId }, function (err, data) {
    if (err) {
      res.send({
        code: 404,
        msg: "Something went wrong",
      });
    } else if (data) {
      res.send({
        code: 200,
        msg: "Cities Data",
        content: data,
      });
    }
  });
});

router.post("/deleteCity", async (req, res) => {
  if (!req.body.id) res.status(401).send({ message: "no ID" });
  const city = await Cities.findByIdAndDelete(req.body.id);
  if (!city) {
    res.status(400).send({ message: "something went wrong!" });
  }
  res.status(201).send(city);
});

router.post("/updateCity", async (req, res) => {
  if (!req.body) res.status(401).send({ message: "no ID" });
  const city = await Cities.findByIdAndUpdate(req.body.id, req.body, {
    new: True,
  });
  if (!city) {
    res.status(400).send({ message: "something went wrong!" });
  }
  res.status(201).send(city);
});

module.exports = router;
