const express = require("express");
const router = express.Router();
const Company = require("../models/company");
const Region = require("../models/region");
const _ = require("underscore");
const multer = require("../middlewares/multer");
const httpStatus = require("http-status");

router.post("/postCompany", multer.single("companyLogo"), async (req, res) => {
  console.log(req.body, "<============== body");
  console.log(req.file, "<============== file");
  if (!req.file) {
    console.log("file note found");
    res
      .status(httpStatus.BAD_REQUEST)
      .send({ message: "no logo found .. logo is required" });
  } else {
    console.log("file found");
    req.body.logoImg = req.file.filename;
    const company = await Company.create(req.body);
    // const countRegion = await Region.findOne({ _id: company.regionId });
    // const companies = await Company.find({ regionId: company.regionId });
    // const ms = countRegion.abbreviation + "_" + companies.length;
    // const updatedRegion = await Region.findByIdAndUpdate(
    //   company.regionId,
    //   {
    //     objectId: countRegion.abbreviation + "_" + companies.length,
    //   },
    //   { new: true }
    // );
    // console.log(updatedRegion, "<===== updated Region");
    res.status(httpStatus.CREATED).send(company);
  }
});

router.get("/getCompanies", async (req, res) => {
  const company = await Company.find();

  res.status(httpStatus.ACCEPTED).send(company);
});

router.post("/getCompany", async (req, res) => {
  if (!req.body.id)
    res.status(httpStatus.BAD_REQUEST).send({ message: "no ID" });
  else {
    const company = await Company.findById(req.body.id);
    res.status(httpStatus.ACCEPTED).send(company);
  }
});

router.post("/getSpecificCompanyById", (req, res) => {
  let companyData = req.body;
  Companies.find({ _id: companyData.objectId }, function (err, data) {
    if (err) {
      res.send({
        code: 404,
        msg: "Something went wrong",
      });
    } else if (data) {
      res.send({
        code: 200,
        msg: "Companies Data",
        content: data,
      });
    }
  });
});

router.post("/deleteCompany", async (req, res) => {
  if (!req.body.id) {
    res.status(400).send({ message: "no data or id found !!!" });
  } else {
    const result = await Company.findByIdAndDelete(req.body.id);
    res.status(200).send(result);
  }
});

router.post(
  "/updateCompany",
  multer.single("companyLogo"),
  async (req, res) => {
    if (!req.body.id || !req.body) {
      console.log("wwwwwwwwwwwwwwwwwwwwow");
      res.status(400).send({ message: "no data or id found !!!" });
    } else {
      console.log("running");
      if (req.file) {
        req.body.logoImg = req.file.filename;
      }
      console.log("wow");
      const result = await Company.findByIdAndUpdate(req.body.id, req.body, {
        new: true,
      });
      res.status(200).send(result);
    }
  }
);

module.exports = router;
