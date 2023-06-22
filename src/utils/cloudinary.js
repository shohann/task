const cloudinary = require('cloudinary').v2;

const dotenv = require('dotenv');
dotenv.config();

const { unlink } = require('fs').promises;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports.cloudinaryUploader = async (localPath) => {
    const { secure_url } = await cloudinary.uploader.upload(localPath);
    await unlink(localPath);
    return secure_url;
};