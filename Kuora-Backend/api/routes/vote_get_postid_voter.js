const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Vote = require("../models/vote");

router.get("/:post_id/:voter_email", (req, res, next) => {
  const voter_email = req.params.voter_email;
  const post_id = req.params.post_id;
  Vote.find({
    voter_email: voter_email,
    post_id: post_id,
  })
    .exec()
    .then((result) => {
      res.status(200).json({
        code: 200,
        message: "Vote Successfully found",
        vote: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
