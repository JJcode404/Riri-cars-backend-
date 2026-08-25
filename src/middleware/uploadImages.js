const multer = require("multer");
const { ApiError } = require("./errorHandler");

const MAX_IMAGES = 6;

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024, files: MAX_IMAGES },
  fileFilter(_req, file, cb) {
    if (/^image\/(png|jpe?g|webp|avif|gif)$/.test(file.mimetype)) {
      return cb(null, true);
    }
    cb(
      new ApiError(
        400,
        "Only PNG, JPEG, WebP, AVIF, or GIF images are allowed",
      ),
    );
  },
});

function uploadVehicleImages(req, res, next) {
  upload.array("images", MAX_IMAGES)(req, res, (err) => {
    if (!err) return next();
    if (err instanceof multer.MulterError) {
      const msg =
        err.code === "LIMIT_FILE_SIZE"
          ? "Each image must be 5 MB or smaller"
          : err.code === "LIMIT_FILE_COUNT" ||
              err.code === "LIMIT_UNEXPECTED_FILE"
            ? `You can upload at most ${MAX_IMAGES} images`
            : err.message;
      return next(new ApiError(400, msg));
    }
    next(err);
  });
}

module.exports = { uploadVehicleImages };
