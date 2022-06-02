const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Vote = require("../models/vote");
const bcryptjs = require("bcryptjs");

router.post("/", (req, res, next) => {
  const vote = new Vote({
    _id: new mongoose.Types.ObjectId(),
    voter_email: req.body.voter_email,
    // post_email: req.body.post_email,
    post_id: req.body.post_id,
    rating: req.body.rating,
  });

  vote
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        code: 200,
        message: "vote Successfully Submitted",
        vote: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        code: 500,
        error: err,
      });
    });
});

module.exports = router;
