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
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const nodemailer = require("nodemailer");

var otp = Math.random();
otp = otp * 1000000;
otp = parseInt(otp);
console.log(otp);

function otpAgain() {
  otp = Math.random();
  otp = otp * 1000000;
  otp = parseInt(otp);
  console.log(otp);
}

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  service: "gmail",
  auth: {
    user: "kuorateam@gmail.com",
    pass: "RajPriyam@25",
  },
});

router.post("/send", function (req, res) {
  otpAgain();
  var mailOptions = {
    to: req.body.email,
    subject: "Otp for registration is: ",
    html:
      "<h3>OTP for account verification is </h3>" +
      "<h1 style='font-weight:bold;'>" +
      otp +
      "</h1>", // html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(400).json({
        code: 400,
        message: error,
      });
    }
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // res.render("otp");
     return res.status(200).json({
       code: 200,
       message: "Otp Sent",
     });
  });
});

router.post("/", upload.single("pic"), (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((email) => {
      if (email.length >= 1) {
        return res.status(200).json({
          code: 409,
          message: "Email Id already exist",
        });
      } else {
        bcryptjs.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              code: 500,
              error: err,
            });
          } else {
            if (req.body.otp == otp) {
              const pic_path = req.file ? req.file.path : "uploads/testimg.png";
              const user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hash,
                name: req.body.name,
                gender: req.body.gender,
                bio: req.body.bio,
                year: req.body.year,
                signupas: req.body.signupas,
                mobno: req.body.mobno,
                pic: pic_path, //"uploads/Abhishek.jpg", //req.file.path,
                tag: req.body.tag,
                verified: req.body.verified,
                approvedBy: req.body.approvedBy,
                blocked: req.body.blocked,
                // postcount:req.body.postcount,
              });
              user
                .save()
                .then((result) => {
                  console.log(result);
                  res.status(201).json({
                    code: 200,
                    message: "User Successfully Submitted",
                    user: result,
                    // {
                    //     _id: result._id,
                    //     email: result.email,
                    //     name:result.name,
                    //     gender:result.gender,
                    //     bio:result.bio,
                    //     year:result.year,
                    //     signupas:result.signupas,
                    //     mobno:result.mobno,
                    //     pic:result.pic,
                    //     tag:result.tag,
                    //     postcount:result.postcount,
                    // }
                  });
                })
                .catch((err) => {
                  console.log(err);
                  res.status(500).json({
                    code: 500,
                    error: err,
                  });
                });
            } else {
              return res.status(500).json({
                code: 500,
                error: "wrong OTP",
              });
            }
          }
        });
      }
    });
});

module.exports = router;
