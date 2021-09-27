const express = require("express");
const router = express.Router();
const Representative = require("../models/representative");
const _ = require("underscore");
const main = require("../middlewares/mailer");
const verifyToken = require("../middlewares/verifyToken");

router.post("/postRepresentative", async (req, res) => {
  if (req.body === null || req.body === undefined || req.body === {})
    res.status(403).send({ message: "no data received" });
  const representative = await Representative.create(req.body);
  if (!representative) {
    res.status(400).send({ message: "something went wrong!" });
  } else {
    res.status(201).send(representative);
  }
});

router.get("/getRepresentatives", (req, res) => {
  Representative.find(function (err, data) {
    if (err) {
      res.send({
        code: 404,
        msg: "Something went wrong",
      });
    } else if (data) {
      res.send({
        code: 200,
        msg: "All Representative Data",
        content: data,
      });
    }
  });
});

router.post("/getSpecificRepresentativesById", (req, res) => {
  let representativeData = req.body;
  Representative.find(
    { representativeId: representativeData.objectId },
    function (err, data) {
      if (err) {
        res.send({
          code: 404,
          msg: "Something went wrong",
        });
      } else if (data) {
        res.send({
          code: 200,
          msg: "Employee Name Data",
          content: data,
        });
      }
    }
  );
});

router.post("/representativeByTeriitory", (req, res) => {
  let representativeData = req.body;
  Representative.find(
    { territoryId: representativeData.objectId },
    function (err, data) {
      if (err) {
        res.send({
          code: 404,
          msg: "Something went wrong",
        });
      } else if (data) {
        res.send({
          code: 200,
          msg: "Representative Data",
          content: data,
        });
      }
    }
  );
});

router.post("/sendEmail", (req, res) => {
  let representativeData = req.body;
  console.log(representativeData, "email api");
  main(representativeData)
    .then((response) => {
      console.log(response, "response");
      return res.status(200).json({ success: true, data: response });
    })
    .catch((err) => {
      console.log(err, "err in email send");
      return res.status(400).json({ error: "Error Occured" });
    });
});

router.post("/deleteRepresentative", (req, res) => {
  var representativeData = req.body;
  Representative.deleteOne(
    { _id: representativeData.objectId },
    function (err, docs) {
      if (err) {
        res.json(err);
      } else {
        res.send({
          code: 200,
          msg: "Representative data delete successfully",
          content: docs,
        });
      }
    }
  );
});

module.exports = router;
