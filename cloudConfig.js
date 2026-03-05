const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET || process.env.CLOUD_API_SECRETE,
});


const storage = new CloudinaryStorage({  // SAME as our storage, copied from multur cloudinary storage npm 
  cloudinary: cloudinary,
  params: {
    folder: "wonderlust_DEV",
    allowedFormats: ["png", "jpg", "jpeg"], // supports promises as well
  },
});

module.exports = {
  cloudinary,
  storage,
};
