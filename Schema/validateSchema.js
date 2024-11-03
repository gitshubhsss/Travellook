//here we are doing Schema validation 
//we require the listing schema and express error just to throw the errors
const listingSchema = require("./listingSchema");
const ExpressError=require("../utils/ExpressError");                                                          
const validateSchema = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    throw new ExpressError(400, error.details[0].message);
  } else {
    next();
  }
};
module.exports = validateSchema;
