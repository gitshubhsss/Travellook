const Listing = require("../models/listings")

module.exports.index = async (req, res) => {
  let listings = await Listing.find();
  res.render("listings/index.ejs", { listings });
}

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
}

module.exports.addListing = async (req, res, next) => {
  //we are just making this to handel the postman hackers
  console.log("printing the listing body");
  console.log(req.body);
  let url = req.file.path;
  let filename = req.file.filename;
  console.log(url, "...", filename);
  if (!req.body.listing) {
    throw new ExpressError(404, "Send the valid data");
  }
  let newList = new Listing({ ...req.body.listing });
  newList.owner = req.user._id;
  newList.image = { url, filename }
  await newList.save();
  req.flash("success", "new listing created");
  res.redirect("/listings");
}

module.exports.showListing = async (req, res, next) => {
  let { id } = req.params;
  let listing = await Listing.findById(id).populate({
    path: "reviews", populate: {
      path: "auther"
    }
  }).populate("owner"); //populate in the sense we are going to
  //share the whole object of the reviews
  // console.log(listing.reviews);
  // let reviews=await Review.find({_id:{$in:listing.reviews}});
  if (!listing) {
    req.flash("error", "Listing you have requested for does not exits");
    res.redirect("/listings");
  } else {
    console.log(listing);

    res.render("listings/show.ejs", { listing });
  }
}

module.exports.editListing = async (req, res, next) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing) {
    req.flash(
      "error",
      "The listings that you are trying to edit does not exists"
    );
    res.redirect("/listings");
  } else {
    let originalImage = listing.image.url;
    originalImage = originalImage.replace("/upload", "/upload/h_300,w_250")
    res.render("listings/edit.ejs", { listing, originalImage });
  }
}

module.exports.updateListing = async (req, res, next) => {
  if (!req.body.listing) {
    throw new ExpressError(404, "updation failed");
  }
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename },
      await listing.save();
  }
  req.flash("success", "Edited successfully");
  res.redirect(`/listings/${id}`);
}

module.exports.deleteListing = async (req, res, next) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "deleted successfully");
  res.redirect("/listings");
}

module.exports.categoryListing = async (req, res, next) => {
  const { category } = req.query;
  try {
    let listings;
    if (category) {
      // Explicitly query by the 'category' field
      listings = await Listing.find({ category });
    } else {
      listings = await Listing.find({});
    }
    res.render('listings/category', { listings });  // Render listings in a view
  } catch (e) {
    console.error(e);
    req.flash('error', 'Cannot find listings');
    res.redirect('/');
  }

}