const Joi = require("joi");
const { LISTING_CATEGORY_VALUES } = require("./utils/listingCategories.js");

module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    location: Joi.string().required(),
    country: Joi.string().required(),
    category: Joi.string().valid(...LISTING_CATEGORY_VALUES).optional(),
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
  }).required(),
});

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(1).max(5),
    comment: Joi.string().required(),
  }).required(),
});
