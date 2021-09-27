const express = require("express");
const router = express.Router();
const Company = require("../models/company");
const Region = require("../models/region");
const _ = require("underscore");
const multer = require("../middlewares/multer");
const httpStatus = require("http-status");

router.post("/postCompany", multer.single("CompanyLogo"), async (req, res) => {
  if (!req.file) {
    res.status(httpStatus.BAD_REQUEST, "no logo found .. logo is required");
  } else {
    req.body.logoImg = req.file.filename;
    const company = await Company.create(req.body);
    const countRegion = await Region.findOne({ _id: company.regionId });
    const companies = await Company.find({ regionId: company.regionId });
    const ms = countRegion.abbreviation + "_" + companies.length;
    const updatedRegion = await Region.findByIdAndUpdate(
      company.regionId,
      {
        objectId: countRegion.abbreviation + "_" + companies.length,
      },
      { new: true }
    );
    console.log(updatedRegion, "<===== updated Region");
    res.status(httpStatus.CREATED).send(company);
  }
});

router.get("/getCompanies", async (req, res) => {
  const company = await Company.find();

  res.status(httpStatus.ACCEPTED).send(company);
});

router.get("/getCompanY", async (req, res) => {
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

router.post("/deleteCompany", (req, res) => {
  var companyData = req.body;
  Companies.deleteOne({ _id: companyData.objectId }, function (err, docs) {
    if (err) {
      res.json(err);
    } else {
      res.send({
        code: 200,
        msg: "Company data delete successfully",
        content: docs,
      });
    }
  });
});

module.exports = router;
