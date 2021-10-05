const express = require("express");
const router = express.Router();
const Tier = require("../models/tier");
const _ = require("underscore");

router.post("/postTier", async (req, res) => {
  const result = await Tier.create(req.body);
  res.status(201).send(result);
});

router.get("/getTiers", async (req, res) => {
  const result = await Tier.find();
  res.status(200).send(result);
});

router.post("/getTier", async (req, res) => {
  const result = await Tier.findById(req.body.id);
  res.status(200).send(result);
});

router.post("/getSpecificTierById", (req, res) => {
  let tierData = req.body;
  Tier.find({ _id: tierData.objectId }, function (err, data) {
    if (err) {
      res.send({
        code: 404,
        msg: "Something went wrong",
      });
    } else if (data) {
      res.send({
        code: 200,
        msg: "Tier Data",
        content: data,
      });
    }
  });
});

router.post("/deleteTier", async (req, res) => {
  const result = await Tier.findByIdAndDelete(req.body.id);
  res.status(200).send(result);
});

router.post("/updateTier", async (req, res) => {
  const result = await Tier.findByIdAndUpdate(req.body.id, req.body, {
    new: true,
  });
  res.status(200).send(result);
});

module.exports = router;
