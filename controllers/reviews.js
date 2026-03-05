const Review = require('../models/review.js');
const Listing = require('../models/listing.js');
const { listingSchema, reviewSchema } = require("../schema.js");

// Review Post 
module.exports.reviewPost =async (req, res) => {
    let { id } = req.params;

    let listing = await Listing.findById(id);
    const newReview = new Review(req.body.review);
    newReview.author = req.user._id;

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    console.log("Review was saved");
    req.flash('success','New Review Created');
    res.redirect(`/listings/${id}`);   // ✅ Fixed
};

module.exports.reviewDelete = async(req,res)=>{
    let {id,reviewId} = req.params;
    await Listing.findByIdAndUpdate(id,{$pull : {reviews : reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash('success',' Review Deleted!');
    res.redirect(`/listings/${id}`);
}