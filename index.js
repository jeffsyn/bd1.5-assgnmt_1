let express = require('express');
let cors = require("cors");
let { resolve } = require('path');
let app = express();
let port = 3000;
app.use(cors());

// Server side values 
let taxRate = 5; // 5%
let discountPercentage = 10; // 10%
let loyaltyRate = 2; // 2 points per $1

//Endpoint-1: Calculate the total price of items in cart
app.get("/cart-total", (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  let result = newItemPrice + cartTotal;
  res.send(result.toString());
});
/// API Call - https://stackblitzstartersa9gnkk-34f5--3000--fc837ba8.local-credentialless.webcontainer.io/cart-total?newItemPrice=1200&cartTotal=0

//Endpoint-2: Apply a discount based on membership status
app.get("/membership-discount", (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember === "true";
  let discountedPrice = cartTotal - (cartTotal * (10 / 100));
  let result;
  if (isMember === true) {
    result = discountedPrice;
  } else {
    result = cartTotal;
  }
  res.send(result.toString());
});
/// API Call - https://stackblitzstartersa9gnkk-34f5--3000--fc837ba8.local-credentialless.webcontainer.io/membership-discount?cartTotal=3600&isMember=true


//Endpoint-3: Calculate tax on the cart total
app.get("/calculate-tax", (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let taxRate = 5 / 100; 
  let tax = cartTotal * taxRate;
  let result = tax;
  res.send(result.toString());
});
/// API Call - https://stackblitzstartersa9gnkk-34f5--3000--fc837ba8.local-credentialless.webcontainer.io/calculate-tax?cartTotal=3600


//Endpoint-4: Estimate delivery time based on shipping method
app.get("/estimate-delivery", (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  let deliveryTime;
  if (shippingMethod === "standard") {
    deliveryTime = (distance / 50); // 1 day per 50 kms
  } else if (shippingMethod === "express") {
    deliveryTime = (distance / 100); // 1 day per 100 kms
  }
  let result = deliveryTime;
  res.send(result.toString());
});
/// API Call - https://stackblitzstartersa9gnkk-34f5--3000--fc837ba8.local-credentialless.webcontainer.io/estimate-delivery?shippingMethod=express&distance=600


//Endpoint-5: Calculate the shipping cost based on weight and distance
app.get("/shipping-cost", (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  let shippingCost = weight * distance * 0.1;
  let result;
  result = shippingCost;
  res.send(shippingCost.toString());
});
/// API Call - https://stackblitzstartersa9gnkk-34f5--3000--fc837ba8.local-credentialless.webcontainer.io/shipping-cost?weight=2&distance=600


//Endpoint-6: Calculate loyalty points earned from a purchase
app.get("/loyalty-points", (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  let loyaltyRate = 2; // 2 points per ₹1
  let earnedPoints = purchaseAmount * loyaltyRate;
  let result;
  result = "You have earned Loyalty Points of " + earnedPoints + " from this purchase. Thank You. Visit Again!";
  res.send(result.toString());
});
/// API Call - https://stackblitzstartersa9gnkk-34f5--3000--fc837ba8.local-credentialless.webcontainer.io/loyalty-points?purchaseAmount=3600




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});