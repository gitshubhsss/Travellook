const express = require("express");
const router = express.Router({ mergeParams: true });
const passport = require("passport");
const asyncErrorHandler = require("../utils/asyncWrap"); //reducing try and catch
const saveRedirectUrl = require("../utils/saveRedirectUrl");
const userController = require("../controller/users")

//signup
router.route("/signup")
  .get(userController.renderSignUpForm)
  .post(
    asyncErrorHandler(userController.singUp)
  );
//login
router.route("/login")
  .get(userController.renderLoginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.loginUser
  )

router.get("/logout", userController.logoutUser);
module.exports = router;
