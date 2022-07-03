require("dotenv").config();

const cloudinary = require("cloudinary").v2;


cloudinary.config({
  cloud_name:process.env.CLOUDNAME,
  api_key: process.env.CLOUDKEY,
  api_secret:process.env.CLOUDSECRET,  
  secure: true,
});

module.exports = cloudinary;