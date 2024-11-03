const Listing = require("../models/listings");
const Review = require("../models/rewiew");

module.exports.createReviews=async (req, res, next) => {
    console.log(req.params.id);
    let listing = await Listing.findById(req.params.id);
    if (!req.body.review) {
      throw new ExpressError(404, "send the valid data");
    }
    let newReview = new Review(req.body.review);
    newReview.auther=req.user._id; //we are passing the current user 
    console.log(newReview);
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success", "reviews added successfully");
    res.redirect(`/listings/${listing._id}`);
  }

  module.exports.destroyReview=async (req, res, next) => {
    let { id, revId } = req.params;
    // console.log(id);
    // console.log(revId);
    let result = await Listing.updateOne({}, { $pull: { reviews: revId } }); //deleting it from the listing collection
    let result2 = await Review.findByIdAndDelete(revId); //deleting it from the Reiview collection
    // console.log(result);
    // console.log(result2);
    req.flash("success", "review deleted successfully");
    res.redirect(`/listings/${id}`);
  }