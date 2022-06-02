const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().getTime() + file.originalname);
  },
});
const upload = multer({ storage: storage });
const Verification = require("../models/verification");
const bcryptjs = require("bcryptjs");

router.post("/", upload.single("documentPic"), (req, res, next) => {
  const verification = new Verification({
    _id: new mongoose.Types.ObjectId(),
    request: req.body.request,
    email: req.body.email,
    date: req.body.date,
    documentPic: req.file.path,
  });
  verification
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        code: 200,
        message: "Verification Request Successfully Submitted",
        verification: result,
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

router.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  Verification.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
