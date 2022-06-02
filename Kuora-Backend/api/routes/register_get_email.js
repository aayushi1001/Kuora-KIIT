const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User= require("../models/user");

router.get('/:email',(req,res,next) =>{
        const email=req.params.email;
        User.find({email:email})
        .exec()
        .then(result =>{
            res.status(200).json({
            code:200,
            message: 'User Successfully found',
            user: result
        });
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                code:500,
                error:err
            });
        });
        
    });

     
module.exports = router;