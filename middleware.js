const Listing = require('./models/listing.js');
const Review = require('./models/review.js');
const { listingSchema, reviewSchema } = require("./schema.js");
const ExpressError = require("./utils/ExpressError");


module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;  // req.originalUrl store the url of requested root
        req.flash('error',"You must be logged in!");
        return res.redirect('/login');
    }
    next();
};


module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;  // here we stored into the local variable beacause the session on logged in remove the data but local var is remain as usual
    }
    next();
}

module.exports.isOwner = async(req,res,next)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing){
        req.flash('error','Listing does not exist!');
        return res.redirect('/listings');
    }
    const ownerId = listing.owner && listing.owner._id ? listing.owner._id : listing.owner;
    if(!ownerId || ownerId.toString() !== res.locals.currUser._id.toString()){
        req.flash('error','Only owner can edit or delete the Listings!');
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.isAuthor = async(req,res,next)=>{
    let {id, reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if(!review){
        req.flash('error','Review does not exist!');
        return res.redirect(`/listings/${id}`);
    }
    const authorId = review.author && review.author._id ? review.author._id : review.author;
    if(!authorId || authorId.toString() !== res.locals.currUser._id.toString()){
        req.flash('error','Only owner can edit or delete the review!');
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errorMsg = error.details.map((e) => e.message).join(",");
        throw new ExpressError(400, errorMsg);
    } else {
        next();
    }
}

module.exports.validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        let errorMsg = error.details.map((e) => e.message).join(",");
        throw new ExpressError(400, errorMsg);
    } else {
        next();
    }
}

