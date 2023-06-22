const { cloudinaryUploader } = require('../utils/cloudinary');
const { ApplicationError } = require('../utils/appError');
const { unlink } = require('fs').promises;

module.exports.uploadToCloud = async (req, res, next) => {
    const localPath = req.file ? req.file.path : null;

    try {
        if (!localPath) {
            return next();
        }

        const image = await cloudinaryUploader(localPath);
        if (!image) throw new ApplicationError('Internal server error');
        req.image = image;
        next();
    } catch (error) {
        // await unlink(localPath);
        next(error);
    }
};