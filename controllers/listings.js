const Listing = require("../models/listing.js");
const { listingSchema, reviewSchema } = require("../schema.js");

// Index Route call-back
module.exports.index = async (req, res) => {
  let allListings = await Listing.find({});
  allListings.forEach((listing) => {
    listing.image.url = listing.image.url.replace(
      "/upload",
      "/upload/w_400,q_auto,f_auto",
    );
  });

  res.render("./listings/index.ejs", { allListings });
};

//New Route
module.exports.renderNewForm = (req, res) => {
  console.log(req.user); // req has the user object that stores the user data.  the data is in session
  // if(!req.isAuthenticated()){  //instead of this i use the middleware fun isLoggedIn
  //  req.flash("error","You must be logged in first!");
  //  return res.redirect('/login');
  // }

  res.render("./listings/new.ejs");
};

// Post New Route

module.exports.newRoutePost = async (req, res, next) => {
  try {
    let listing = req.body.listing;

    let url = req.file.path;
    let fileName = req.file.filename;

    // Joi Validation
    let result = listingSchema.validate(req.body);
    if (result.error) {
      throw new ExpressError(400, result.error.message);
    }

    const { latitude, longitude } = listing;

    let newListing = new Listing({
      title: listing.title,
      description: listing.description,
      price: listing.price,
      location: listing.location,
      country: listing.country,
      image: {
        filename: fileName,
        url: url,
      },
      geometry: {
        type: "Point",
        coordinates: [Number(longitude), Number(latitude)], // ⚠️ lng first, lat second
      },
    });

    newListing.owner = req.user._id;

    await newListing.save();

    req.flash("success", "New listing created successfully!");
    res.redirect("/listings");
  } catch (err) {
    next(err);
  }
};

//Search Route
module.exports.searchRoute = async (req, res, next) => {
  try {
    const { country } = req.body;
    console.log(country);
    const listing = await Listing.findOne({ country: country })
      .populate({
        path: "reviews",
        populate: {
          path: "author", // 🔥 this is the important fix
        },
      })
      .populate("owner");
    if (listing) {
      listing.image.url = listing.image.url.replace(
        "/upload",
        "/upload/w_900,q_auto,f_auto",
      );
      res.render("./listings/show.ejs", { listing });
    } else {
      req.flash("error", `No Listing Found for country ${country}`);
      return res.redirect("/listings");
    }
  } catch (err) {
    next(err);
  }
};
//Read Route Get
//module.exports.readRouteGet = // Read Route Get
module.exports.readRouteGet = async (req, res) => {
  let { id } = req.params;

  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author", // 🔥 this is the important fix
      },
    })
    .populate("owner");

  if (!listing) {
    req.flash("error", "Listing does not exist!");
    return res.redirect("/listings");
  }

  listing.image.url = listing.image.url.replace(
    "/upload",
    "/upload/w_900,q_auto,f_auto",
  );

  res.render("listings/show.ejs", {
    listing,
    mapToken: process.env.MAP_TOKEN,
  });
};

//edit route get

module.exports.editRouteGet = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "The requested listing is not exists");
    res.redirect("/listings");
  }
  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_400");
  res.render("./listings/edit.ejs", { listing, originalImageUrl });
};

module.exports.editRoutePost = async (req, res) => {
  let { id } = req.params;
  console.log(req.body.listing);
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let fileName = req.file.filename;
    listing.image = { url, fileName };
    await listing.save();
  }
  req.flash("success", "Listing is edited");
  res.redirect(`/listings/${id}`);
};

//delete route
module.exports.delete = async (req, res) => {
  // if(!req.isAuthenticated()){
  //     req.flash('error','You must be logged in first');
  //     return res.redirect('/login');
  // }
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing is Deleted!");
  res.redirect("/listings");
};
