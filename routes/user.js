const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const wrapAsync = require('../utils/wrapAsync');
const passport = require('passport');
const Listing = require("../models/listing");
const {isLoggedIn,saveRedirectUrl} = require("../middleware.js");
const userController = require('../controllers/users.js');

router.get('/signup',userController.renderSignupForm);

router.post('/signup',wrapAsync(userController.signUpPost));

router.get('/login',userController.renderLoginForm);

router.post('/login',
    saveRedirectUrl,
passport.authenticate('local',{
    failureRedirect : "/login",   
    failureFlash : true,
}),
userController.loginPost);


// logout
router.get("/logout",userController.logout)

module.exports = router;
