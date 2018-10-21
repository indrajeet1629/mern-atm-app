const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
// Schema Model
const Product = require("../models/product");

// get (url,callback(req, res, next))
router.post("/", (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  });
  product
    .save()
    .then(result => {
      console.log("result", result);
    })
    .catch(error => {});
  res.status(201).json({
    message: "Products Get API",
    card: product
  });
});

module.exports = router;
