const express = require("express");
const router = express.Router();
const Hospital = require("../models/hospital");
const _ = require("underscore");

router.post("/postHospital", async (req, res) => {
  if (req.body === null || req.body === undefined)
    res.status(403).send({ message: "no data received" });
  const hospital = await Hospital.create(req.body);
  if (!hospital) {
    res.status(400).send({ message: "something went wrong!" });
  } else {
    res.status(201).send(hospital);
  }
});

router.get("/getHospitals", async (req, res) => {
  const brick = await Hospital.find().populate({
    path: "brickId",
    populate: {
      path: "territoryId",
      model: "territory",
      populate: {
        path: "zoneId",
        model: "zone",
        populate: {
          path: "regionId",
          model: "region",
          populate: { path: "provinceId", model: "province" },
        },
      },
    },
  });
  if (!brick) {
    res.status(400).send({ message: "something went wrong!" });
  } else {
    res.status(201).send(brick);
  }
});

router.post("/getHospital", async (req, res) => {
  if (req.body === null || req.body === undefined || req.body === {})
    res.status(403).send({ message: "no data received" });
  const brick = await Hospital.findById(req.body.id).populate({
    path: "brickId",
    populate: {
      path: "territoryId",
      model: "territory",
      populate: {
        path: "zoneId",
        model: "zone",
        populate: {
          path: "regionId",
          model: "region",
          populate: { path: "provinceId", model: "province" },
        },
      },
    },
  });
  if (!brick) {
    res.status(400).send({ message: "something went wrong!" });
  } else {
    res.status(201).send(brick);
  }
});

router.post("/getSpecificHospitalById", (req, res) => {
  let hospitalData = req.body;
  Hospital.find({ _id: hospitalData.objectId }, function (err, data) {
    if (err) {
      res.send({
        code: 404,
        msg: "Something went wrong",
      });
    } else if (data) {
      res.send({
        code: 200,
        msg: "Hospital Data",
        content: data,
      });
    }
  });
});

router.post("/deleteHospital", async (req, res) => {
  if (req.body === null || req.body === undefined || req.body === {})
    res.status(403).send({ message: "no data received" });
  const brick = await Hospital.findByIdAndDelete(req.body.id);
  if (!brick) {
    res.status(400).send({ message: "something went wrong!" });
  } else {
    res.status(201).send(brick);
  }
});

router.post("/updateHospital", async (req, res) => {
  if (req.body === null || req.body === undefined || req.body === {})
    res.status(403).send({ message: "no data received" });
  const brick = await Hospital.findByIdAndUpdate(req.body.id, req.body, {
    new: true,
  });
  if (!brick) {
    res.status(400).send({ message: "something went wrong!" });
  } else {
    res.status(201).send(brick);
  }
});

module.exports = router;
