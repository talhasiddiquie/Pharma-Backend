const express = require("express");
const router = express.Router();
const Bricks = require("../models/brick");

router.post("/postBrick", async (req, res) => {
  if (req.body === null || req.body === undefined)
    res.status(403).send({ message: "no data received" });
  const brick = await Bricks.create(req.body);
  if (!brick) {
    res.status(400).send({ message: "something went wrong!" });
  } else {
    res.status(201).send(brick);
  }
});

router.get("/getBricks", async (req, res) => {
  const brick = await Bricks.find().populate({
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
  });
  if (!brick) {
    res.status(400).send({ message: "something went wrong!" });
  } else {
    res.status(201).send(brick);
  }
});

router.post("/getBrick", async (req, res) => {
  if (req.body.id === null || req.body.id === undefined || req.body.id === "")
    res.status(403).send({ message: "no data received" });
  const brick = await Bricks.findById(req.body.id).populate({
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
  });
  if (!brick) {
    res.status(400).send({ message: "something went wrong!" });
  } else {
    res.status(201).send(brick);
  }
});

router.post("/getSpecificBricksById", async (req, res) => {
  let bricksData = req.body;
  Bricks.find({ _id: bricksData.objectId }, function (err, data) {
    if (err) {
      res.send({
        code: 404,
        msg: "Something went wrong",
      });
    } else if (data) {
      res.send({
        code: 200,
        msg: "Bricks Data",
        content: data,
      });
    }
  });
});

router.post("/deleteBrick", async (req, res) => {
  if (req.body.id === null || req.body.id === undefined || req.body.id === "")
    res.status(403).send({ message: "no data received" });
  const brick = await Bricks.findByIdAndDelete(req.body.id);
  if (!brick) {
    res.status(400).send({ message: "something went wrong!" });
  } else {
    res.status(201).send(brick);
  }
});

router.post("/updateBrick", async (req, res) => {
  if (req.body === null || req.body === undefined || req.body === "")
    res.status(403).send({ message: "no data received" });
  const brick = await Bricks.findByIdAndUpdate(req.body.id, req.body, {
    new: true,
  });
  if (!brick) {
    res.status(400).send({ message: "something went wrong!" });
  } else {
    res.status(201).send(brick);
  }
});

module.exports = router;
