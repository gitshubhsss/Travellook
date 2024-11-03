//asccesing the env variables

if (process.env.NODE_ENV != "production") {//deployement ke bad node envorment ki value hum set karenge to NODE_ENV
  require("dotenv").config()
}
console.log(process.env.SECRET)

const dburl = process.env.ATLASDBURL;

const express = require("express");
const app = express();
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public/css")));
app.use(express.static(path.join(__dirname, "/public/js")));
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
const engine = require("ejs-mate");
app.engine("ejs", engine);

const session = require("express-session");
const flash = require("connect-flash");

const MongoStore = require("connect-mongo");

const store = MongoStore.create({
  mongoUrl: dburl,
  crypto: {
    secret: process.env.SECRET,

  },
  touchAfter: 24 * 3600
})

store.on("error", () => {
  console.log("Error in monog session store", error);

})

const sessionOption = {
  store: store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};
//Authentication
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");

app.use(session(sessionOption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Requiring routes
const listingRouter = require("./routes/listing.routes");
const reviewRouter = require("./routes/reviews.routes");
const userRouter = require("./routes/user.routes");

app.listen(8080, () => {
  console.log("app is listing on the port ", 8080);
});

//error handeling class
const ExpressError = require("./utils/ExpressError");

//mongodb setup
const mongoose = require("mongoose");
const { log, error } = require("console");


async function main() {
  await mongoose.connect(dburl);
}
main()
  .then(() => {
    console.log("connection success");
  })
  .catch(() => {
    console.log("error");
  });

//Listings

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  // console.log(req.user._id);
  res.locals.currentUser = req.user;
  console.log(req.user);
  next(); //calling to the next non error handeling middleware
});

app.use("/listings", listingRouter);
app.use("/listings/:id/review", reviewRouter);
app.use("/", userRouter);

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Something wents wrong !"));
});

//Error handeling middleware
app.use((err, req, res, next) => {
  console.log("Error handeler called");
  let { statusCode = 500, message } = err;
  res.status(statusCode).render("errors/errors.ejs", { message });
});
