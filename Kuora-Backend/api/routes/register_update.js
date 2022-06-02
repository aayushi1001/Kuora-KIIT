const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User= require("../models/user");

router.post('/:email',(req,res,next) =>{
    const id = req.params.email;
    const updateOps ={};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    User.update({email:id},{$set: updateOps})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
        })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;