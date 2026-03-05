const express =require('express');
const isLoggedIn = require('../middlewares/isLoggedIn');
const router = express.Router();
const productModel = require("../models/product-model");
const userModel = require('../models/user-model');


router.get("/", function (req, res)  {
  let error = req.flash("error");
  res.render("index", { error , loggedin : false }); 
});

router.get("/shop" , isLoggedIn, async function (req, res)  {
 let product = await productModel.find()
 let success = req.flash("success");
  res.render("shop", { product, success });
});

router.get("/cart" , isLoggedIn, async function (req, res)  {
  let user = await userModel.findOne({email : req.user.email}).populate("cart");

  let total = (Number(user.cart[0].price) + 20)-Number(user.cart[0].discount)
  res.render("cart", { user, total});
});

router.get("/addtocart/:productid" , isLoggedIn, async function (req, res)  {
let user = await userModel.findOne({email : req.user.email});
 user.cart.push(req.params.productid);
  await user.save();
 req.flash("success" , "Product added to cart successfully");
  res.redirect("/shop" );
  
});


router.get("/logout" , isLoggedIn, function (req, res)  {
  res.render("shop");
});

module.exports = router;