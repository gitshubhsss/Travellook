const Listing = require("../models/listings");

const isOwner = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id)
    if (!listing.owner._id.equals(res.locals.currentUser._id)) {
        req.flash("error", "you are not the owner of this property")
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports = isOwner;