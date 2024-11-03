const Listing = require("../models/listings");
const Review = require("../models/rewiew");
const checkReviewAuther = async (req, res, next) => {
    let { id, revId } = req.params;
    let review = await Review.findById(revId);
    console.log(review);
    if (!review.auther.equals(res.locals.currentUser._id)) {
        req.flash("error", "you cant delete the review")
        return res.redirect(`/listings/${id}`)
    }
    next();
}

module.exports = checkReviewAuther;