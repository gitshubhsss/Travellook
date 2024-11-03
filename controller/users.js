const User = require("../models/user");

module.exports.renderSignUpForm=async (req, res) => {
    res.render("users/signup.ejs");
  }

  module.exports.singUp=async (req, res, next) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new User({ email, username });
      let registerdUser = await User.register(newUser, password);
      console.log(registerdUser);
      req.login(registerdUser, (err) => {
        if (err) {
          return next(err);
        }
        req.flash("success", "Welcome to TravelLook");
        res.redirect("/listings");
      });
    } catch (error) {
      req.flash("error", error.message);
      res.redirect("/signup");
    }
  }

  module.exports.renderLoginForm=(req, res) => {
    res.render("users/login.ejs");
  }

  module.exports.loginUser=async (req, res) => {
    req.flash("success", "welcome to traverlook");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
  } 

  module.exports.logoutUser=(req, res, next) => {
    req.logOut((err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "you are logged out now");
      res.redirect("/listings");
    }); //req.logOut is a higher order funtion which takes the callback funtion in it
  }