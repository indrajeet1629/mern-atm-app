const express = require("express");
const router = express.Router();
const Card = require("../models/product");

router.post("/", (req, res, next) => {
  const { card_number, pin } = req.body;

  Card.findOne(
    {
      $and: [{ card_number: card_number }, { pin: pin }]
    },
    (err, result) => {
      console.log("result", result);
      if (err) {
        res.status(500).send(err);
        return;
      }
      if (!result) {
        data = {
          meta: {
            status: "fail",
            message: "Authentication Failure: Invalid Card Number or PIN"
          }
        };
        res.status(401).send(data);
      } else {
        data = {
          meta: {
            status: "success",
            message: "Login success"
          }
        };
        res.json(result);
      }
    }
  );
});

module.exports = router;
