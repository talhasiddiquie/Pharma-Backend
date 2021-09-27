const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const upload = require("../middlewares/multer");

router.post("/postProduct", upload.array("files"), (req, res) => {
  console.log(req.files);
  if (req.files) {
    let files = [];
    req.files.map((image) => {
      files.push(image.filename);
    });
    console.log(files, "<=====images");
    req.body.files = files;
  }
  console.log(req.body);
  //   const product = Product.create(req.body);
  //   if (!product) res.status(400).send({ message: "something went wrong" });
  //   else res.status.send(201).send(product);
});

router.get("/getProducts", (req, res) => {
  Product.find(function (err, data) {
    if (err) {
      res.send({
        code: 404,
        msg: "Something went wrong",
      });
    } else if (data) {
      res.send({
        code: 200,
        msg: "All Product Data",
        content: data,
      });
    }
  });
});

router.post("/getSpecificProductById", (req, res) => {
  let productData = req.body;
  Product.find({ _id: productData.objectId }, function (err, data) {
    if (err) {
      res.send({
        code: 404,
        msg: "Something went wrong",
      });
    } else if (data) {
      res.send({
        code: 200,
        msg: "Product Data",
        content: data,
      });
    }
  });
});

router.post("/deleteProduct", (req, res) => {
  var productData = req.body;
  Product.deleteOne({ _id: productData.objectId }, function (err, docs) {
    if (err) {
      res.json(err);
    } else {
      res.send({
        code: 200,
        msg: "Product data delete successfully",
        content: docs,
      });
    }
  });
});

module.exports = router;
