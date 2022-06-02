const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Report = require("../models/report");
const bcryptjs = require("bcryptjs");

router.post("/", (req, res, next) => {
  const postid = req.body.postid;
  Report.findOne({ postid: req.body.postid })
    .exec()
    .then((post) => {
      if (post) {
        const newReport = {
          reason: req.body.reason,
          reporter: req.body.reporter,
        };
        Report.updateOne({ postid: postid }, { $push: { report: newReport } })
          .exec()
          .then((result) => {
            console.log(result);
            res
              .status(200)
              .json({ code: 200, message: "Reported Successfully" });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({
              error: err,
            });
          });
      } else {
        const newReport = {
          reason: req.body.reason,
          reporter: req.body.reporter,
        };
        const new_report = new Report({
          postid: req.body.postid,
          title: req.body.title,
          post_email: req.body.post_email,
          report: newReport,
        });

        new_report
          .save()
          .then((result) => {
            res.status(200).json({
              code: 200,
              message: "Reported Successfully",
              report: result,
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({
              error: err,
            });
          });
      }
    });
});

//   const post = new Post({
//     postid: new mongoose.Types.ObjectId(),
//     creator_email: req.body.creator_email,
//     title: req.body.title,
//     tag: req.body.tag,
//     article: req.body.article,
//     verified: req.body.verified,
//   });

//   post
//     .save()
//     .then((result) => {
//       console.log(result);
//       res.status(201).json({
//         code: 200,
//         message: "Post Successfully Submitted",
//         Post: result,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({
//         code: 500,
//         error: err,
//       });
//     });
// });

module.exports = router;
