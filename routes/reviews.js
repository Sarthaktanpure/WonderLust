const express = require('express');
const router = express.Router({mergeParams:true});
const Review = require('../models/review.js');
const Listing = require("../models/listing");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { reviewSchema } = require("../schema.js");
const { trusted } = require('mongoose');
const {isLoggedIn, isAuthor,validateReview} = require('../middleware.js');
const reviewController = require('../controllers/reviews.js');

// Review route
// Post 
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.reviewPost));

// Delete route for reviews
router.delete("/:reviewId", isLoggedIn, isAuthor, wrapAsync(reviewController.reviewDelete));

module.exports = router;
