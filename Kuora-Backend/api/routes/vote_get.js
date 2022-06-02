const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Vote= require("../models/vote");

router.get('/',(req ,res ,next) => {
    Vote.find()
    .exec()
    .then(result =>{
        res.status(200).json({
            code:200,
            message: 'Vote Successfully found',
            vote: result
        });
    })
    .catch(err =>{
        console.log(err);
        req.status(500).json({
            code:500,
            error:err
        });
    });
});

module.exports = router;