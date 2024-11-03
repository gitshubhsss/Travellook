const express = require("express");
const router = express.Router();

const ExpressError = require("../utils/ExpressError");
const asyncErrorHandler = require("../utils/asyncWrap"); //reducing try and catch
const validateListing = require("../Schema/validateSchema");
const Listing = require("../models/listings");
const isOwner = require("../utils/isOwner");
const isLoggedIn = require("../utils/isLoggedIn");
const listingController = require("../controller/listings")


const multer = require('multer');
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage })//for initialization here the file will be saved

router.get(
  "/category",
  asyncErrorHandler(listingController.categoryListing)
)
router.route("/")
  .get(
    asyncErrorHandler(listingController.index)
  )
  .post(
    isLoggedIn,
    upload.single('listing[image]'),
    validateListing,
    asyncErrorHandler(listingController.addListing)
  )
router.get("/new", isLoggedIn, listingController.renderNewForm);


router.route("/:id")
  .get(
    asyncErrorHandler(listingController.showListing)
  )
  .put(
    isLoggedIn,
    isOwner,
    upload.single('listing[image]'),
    validateListing,
    asyncErrorHandler(listingController.updateListing)
  )
  .delete(
    isLoggedIn,
    isOwner,
    asyncErrorHandler(listingController.deleteListing)
  )

router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  asyncErrorHandler(listingController.editListing)
);


module.exports = router;
