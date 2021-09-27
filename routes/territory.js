const express = require("express");
const router = express.Router();
const Territory = require("../models/territory");
const _ = require("underscore");

router.post("/postTerritory", async (req, res) => {
  const territory = await Territory.create(req.body);
  if (!territory) res.status(402).send({ message: "something went wrong" });
  else res.status(201).send(territory);
});

router.get("/getTerritories", async (req, res) => {
  const territory = await Territory.find().populate({
    path: "zoneId",
    model: "zone",
    populate: {
      path: "regionId",
      model: "region",
      populate: { path: "provinceId", model: "province" },
    },
  });
  if (!territory) res.status(402).send({ message: "something went wrong" });
  else res.status(201).send(territory);
});

router.post("/getTerritory", async (req, res) => {
  const territory = await Territory.findById(req.body.id).populate({
    path: "zoneId",
    model: "zone",
    populate: {
      path: "regionId",
      model: "region",
      populate: { path: "provinceId", model: "province" },
    },
  });
  if (!territory) res.status(402).send({ message: "something went wrong" });
  else res.status(201).send(territory);
});

router.post("/deleteTerritory", async (req, res) => {
  const territory = await Territory.findByIdAndDelete(req.body.id);
  if (!territory) res.status(402).send({ message: "something went wrong" });
  else res.status(201).send(territory);
});

router.post("/updateTerritory", async (req, res) => {
  const territory = await Territory.findByIdAndUpdate(req.body.id, req.body, {
    new: true,
  });
  if (!territory) res.status(402).send({ message: "something went wrong" });
  else res.status(201).send(territory);
});

module.exports = router;
