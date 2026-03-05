const express = require('express');
const router =express.Router();

const ownerModel = require('../models/owner-model');


if(process.env.NODE_ENV === "development"){}
    
    

router.post('/create' , async function(req ,res){
    

    let owners = ownerModel.findOne();
    if(owners.length > 0){
        res.send(502).send('you dont have permission to create a new owner')
    }

    let {fullname , email , password} =req.body;
   let createOwner = await ownerModel.create({
        fullname ,
        email,
        password,
    })
    res.status(201).send(createOwner);
});



router.get("/admin" , function(req , res){
 let success =   req.flash("success" )
    res.render("createproducts", {success});
});




module.exports =router;