const multer = require("multer");
const { BadRequest } = require('../utils/appError')
const maxSize = 2 * 1024 * 1024; // separete constant 

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null,  "public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

let uploadFileLocally = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
          cb(null, true);
        } else {
          cb(null, false);
          return cb(new BadRequest('Only .png, .jpg and .jpeg format allowed!'));
        }
    },
    limits: { fileSize: maxSize }
    
}).single("image");

module.exports.upload = (req, res, next) => {
    uploadFileLocally(req, res, function (error) {
        if (error) {
            next(error);
        } 
        // else if (!req.file) {
        //   next(new BadRequest('You must provide a image'));
        // }
        else return next();
    });
};
