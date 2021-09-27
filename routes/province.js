const express = require("express");
const router = express.Router();
const Province = require("../models/province");
const _ = require("underscore");
const provinceValidation = require("../validations/province.validation");
const validate = require("../middlewares/validate");

router.post(
  "/postProvince",
  validate(provinceValidation.createProvince),
  async (req, res) => {
    const province = await Province.create(req.body);
    if (!province) {
      res.status(402).send({ message: "something went wrong " });
    }
    res.status(201).send(province);
  }
);

router.get("/getProvinces", (req, res) => {
  Province.find(function (err, data) {
    if (err) {
      res.send({
        code: 404,
        msg: "Something went wrong",
      });
    } else if (data) {
      res.send({
        code: 200,
        msg: "All Province Data",
        content: data,
      });
    }
  });
});

router.post("/getSpecificProvinceById", (req, res) => {
  let provinceData = req.body;
  Province.find({ _id: provinceData.objectId }, function (err, data) {
    if (err) {
      res.send({
        code: 404,
        msg: "Something went wrong",
      });
    } else if (data) {
      res.send({
        code: 200,
        msg: "Province Data",
        content: data,
      });
    }
  });
});

router.post("/deleteProvince", async (req, res) => {
  if (!req.body.id) {
    res.status(402), send({ message: "no ID found" });
  } else {
    const ID = req.body.id;
    const check = await findProvinceById(ID);
    const province = await Province.findByIdAndDelete(check.id);
    res.status(200).send(province);
  }
});

router.post("/updateProvince", async (req, res) => {
  console.log(req.body);
  if (!req.body.id) {
    res.status(402), send({ message: "no ID found" });
  } else {
    const ID = req.body.id;
    const province = await Province.findByIdAndUpdate(ID, req.body, {
      new: true,
    });
    res.status(200).send(province);
  }
});

router.post("/:id", async (req, res) => {
  const ID = req.params.id;
  const province = await findProvinceById(ID);
  res.status(200).send(province);
});

const findProvinceById = async (id) => {
  const province = await Province.findById(id).populate("provinceId");
  return province;
};

module.exports = router;
