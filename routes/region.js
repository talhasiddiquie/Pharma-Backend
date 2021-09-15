const express = require("express");
const router = express.Router();
const Region = require("../models/region");
const _ = require("underscore");

router.post("/postRegion", (req, res) => {
  var regionData = req.body;
  if (regionData.objectId === "" || regionData.objectId === undefined) {
    const postRegionData = new Region({
      name: regionData.name,
      abbreviation: regionData.abbreviation,
      identifier: regionData.identifier,
      provinceId: regionData.provinceId,
      isActive: regionData.isActive,
      createdBy: regionData.createdBy,
      updatedBy: regionData.updatedBy,
    });
    postRegionData.save(function (err, data) {
      if (err) {
        res.send({
          code: 500,
          content: "Internal Server Error",
          msg: "API not called properly",
        });
      } else if (data) {
        res.send({
          code: 200,
          msg: "Data saved successfully",
          content: data,
        });
      }
    });
  } else if (regionData.objectId !== "") {
    Region.findOneAndUpdate(
      { _id: regionData.objectId },
      { $set: _.omit(regionData, "_id") },
      { new: true }
    )
      .then(() => {
        Region.find({ _id: regionData.objectId }, function (err, documents) {
          res.send({
            error: err,
            content: documents,
            code: 200,
            msg: "data updated successfullly",
          });
        });
      })
      .catch(() => res.status(422).send({ msg: "Internal server error" }));
  }
});

router.get("/getRegions", (req, res) => {
  Region.find(function (err, data) {
    if (err) {
      res.send({
        code: 404,
        msg: "Something went wrong",
      });
    } else if (data) {
      res.send({
        code: 200,
        msg: "All Region Data",
        content: data,
      });
    }
  })
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

router.post("/deleteRegion", (req, res) => {
  var regionData = req.body;
  Region.deleteOne({ _id: regionData.objectId }, function (err, docs) {
    if (err) {
      res.json(err);
    } else {
      res.send({
        code: 200,
        msg: "Region data delete successfully",
        content: docs,
      });
    }
  });
});

module.exports = router;
