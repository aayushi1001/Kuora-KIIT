const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Verification = require("../models/verification");

router.get("/", (req, res, next) => {
  Verification.find()
    .exec()
    .then((result) => {
      res.status(200).json({
        code: 200,
        message: "Verification Request Successfully found",
        verification: result,
      });
    })
    .catch((err) => {
      console.log(err);
      req.status(500).json({
        code: 500,
        error: err,
      });
    });
});

router.get("/:email", (req, res, next) => {
  const email = req.params.email;
  Verification.find({email:email})
    .exec()
    .then((result) => {
      res.status(200).json({
        code: 200,
        message: "Verification Request Successfully found",
        verification: result,
      });
    })
    .catch((err) => {
      console.log(err);
      req.status(500).json({
        code: 500,
        error: err,
      });
    });
});

module.exports = router;
