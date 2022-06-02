const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User= require("../models/user");
const bcryptjs= require('bcryptjs');
const jwt = require('jsonwebtoken');


router.post('/',(req,res,next) => {
    User.find({email: req.body.email})
    .exec()
    .then(email =>{
        if(email.length < 1){
            return res.status(401).json({
                code:401,
                message: 'Auth failed:  Email is Incorrect'
            });
        }
        
            // bcryptjs.compare(0,0,(err,result)=>{
            //     if(err){
            //         return res.status(200).json({
            //             code:401,
            //             message: 'Auth failed: Either Id or Password is Incorrect'
            //         });
            //     }
            //     if(result){
                    const token =jwt.sign({
                        email: email[0].email,
                        //password: email[0].password,
                        name:email[0].name,
                        gender:email[0].gender,
                        bio:email[0].bio,
                        year:email[0].year,
                        signupas:email[0].signupas,
                        mobno:email[0].mobno,
                        pic:email[0].pic,
                        tag:email[0].tag,
                        // postcount:email[0].postcount,
                    },'my_secret_key'
                    
                    );
                return res.status(200).json({
                    code:200,
                    message: 'Auth successful',
                    token :token
                });
            // }
            // return res.status(200).json({
            //     code:401,
            //     message: 'Auth failed: Either Id or Password is Incorrect'
            // });
            // })        
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            code:500,
            message:'Error',
            error:err
        });
    });
         

});

module.exports = router;