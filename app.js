if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 8080;
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require("ejs-mate");
const wrapAsync = require('./utils/wrapAsync.js');
const ExpressError = require("./utils/ExpressError.js");

const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const User = require('./models/user.js');
const LocalStrategy = require('passport-local');
const passport = require('passport'); 

// routers
const listingsRouter = require('./routes/listings.js');
const reviewsRouter = require('./routes/reviews.js');
const userRouter = require('./routes/user.js');


main().then((res)=>{
    console.log("Database connected successfuly!");
}).catch(()=>{
    console.log("Failed to connect DB");
})

 async function main(){
    await mongoose.connect(process.env.MONGO_URL);    
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.urlencoded({ extended: true }));  // middleware
app.use(methodOverride("_method"));  // middleware
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const store = MongoStore.create({
    mongoUrl : process.env.MONGO_URL,
    touchAfter : 24*3600,
});

store.on("error",(err)=>{
    console.log("ERROR IN MONGO SESSION STORE",err);
});

app.use(session({
    store,
    secret : process.env.SECRET,
    resave : false,
    saveUninitialized : true,
    cookie : {
        expires : Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge : 7 * 24 * 60 * 60 * 1000,
        httpOnly : true,
    },
}));

app.use(flash());


// after session use the passport middleware to do not need to relogin for different pages.

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); // we are using the pasport local strategy

passport.serializeUser(User.serializeUser()); // to save the users info into the session 
passport.deserializeUser(User.deserializeUser());  // to remove users session info after close the browser

app.use((req,res,next)=>{
    res.locals.successMsg = req.flash('success');
    res.locals.errorMsg = req.flash('error');
    res.locals.currUser = req.user;  // this stored the users info
    next();
});

app.get("/", (req, res) => {
  res.redirect("/listings");
});

// app.get("/demouser",wrapAsync(async (req,res)=>{
//     const fakeUser = new User({
//         email : "sarthak@123",
//         username : "Sarthak",  // we did not add in schema but passport add it
//     });
//    let registeredUser =  await User.register(fakeUser,"password@123");   // we are going to use .register instead of save with password
//    res.send(registeredUser);
// }));

// listing route
app.use("/listings",listingsRouter);

// reviews route
app.use('/listings/:id/reviews',reviewsRouter);

// user router

app.use('/',userRouter);


// app.get("/", (req, res) => {
//     res.send("root path");
// });


// For the routes that are not exits
app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err && err.stack ? err.stack : err);
    let { status = 500, message = "An Error Occured" } = err;
    res.status(status).render("./listings/error.ejs", { message });
});

app.listen(port, () => {
    console.log(`Server is listening at port ${port}`);
})


