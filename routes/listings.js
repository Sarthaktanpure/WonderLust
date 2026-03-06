const express = require("express");
const router = express.Router();
const multer = require("multer");

const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const wrapAsync = require("../utils/wrapAsync.js");
const listingController = require("../controllers/listings.js");

router.get("/fix-owner",listingController.temp);

// Index + category filter routes
router.get("/", wrapAsync(listingController.index));

// Create routes
router.get("/new", isLoggedIn, listingController.renderNewForm);
router.post(
  "/",
  isLoggedIn,
  upload.single("listing[image][url]"),
  validateListing,
  wrapAsync(listingController.newRoutePost)
);

//search Route
router.post("/Search", wrapAsync(listingController.searchRoute));

// Show route
router.get("/:id", wrapAsync(listingController.readRouteGet));

// Edit routes
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.editRouteGet));
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  upload.single("image"),
  validateListing,
  wrapAsync(listingController.editRoutePost)
);

// Delete route
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(listingController.delete));

module.exports = router;
