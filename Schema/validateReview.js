const ReviewSchema = require("./ReviewSchema");
const ExpressError = require("../utils/ExpressError");

const validateReview = (req, res, next) => {
  let { error } = ReviewSchema.validate(req.body);
  if (error) {
    throw new ExpressError(400, error.details[0].message);
  } else {
    next();
  }
};
module.exports = validateReview;
