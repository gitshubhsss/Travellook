const express = require("express");
const route = express.Router({ mergeParams: true });

const ExpressError = require("../utils/ExpressError");
const asyncErrorHandler = require("../utils/asyncWrap"); //reducing try and catch
const validateListing = require("../Schema/validateSchema");
const validateReview = require("../Schema/validateReview");
const Listing = require("../models/listings");
const Review = require("../models/rewiew");
const isLoggedIn = require("../utils/isLoggedIn");
const checkReviewAuther = require("../utils/checkRewiewAuther");

const reviewController = require("../controller/reviews");
// const checkReviewAuther=require("../utils/")

//Review
//Post
route.post(
  "/",
  isLoggedIn,
  validateReview, //basically validateReview is a middleware funtion 
  asyncErrorHandler(reviewController.createReviews)
);

//Delete Reviews

route.delete(
  "/:revId",
  isLoggedIn,
  checkReviewAuther,
  asyncErrorHandler(reviewController.destroyReview)
);
module.exports = route;
