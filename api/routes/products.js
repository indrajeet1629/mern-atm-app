const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
// Schema Model
const Card = require("../models/product");

// Add Card.
router.post("/", (req, res, next) => {
  const card = new Card({
    card_number: req.body.card_number,
    pin: req.body.pin,
    balance: req.body.balance
  });
  card
    .save()
    .then(result => {
      res.status(201).json({
        message: "New Product Added",
        card: card
      });
    })
    .catch(error => {
      console.log("Error", error);
      res.status(500).json({
        message: "Something went wrong"
      });
    });
});

// list Cards
router.get("/", (req, res, next) => {
  Card.find()
    .select({ card_number: 1, balance: 1, is_active: 1 })
    .exec()
    .then(doc => {
      res.status(200).json(doc);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

module.exports = router;
