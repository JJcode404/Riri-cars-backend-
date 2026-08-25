const { v2: cloudinary } = require("cloudinary");
const { ApiError } = require("../middleware/errorHandler");

let configured = false;

function cloudinaryEnabled() {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET,
  );
}

function ensureConfigured() {
  if (!cloudinaryEnabled()) {
    throw new ApiError(503, "Image uploads are not configured");
  }
  if (!configured) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });
    configured = true;
  }
}

function uploadImage(buffer, { folder = "riri-cars", publicId } = {}) {
  ensureConfigured();

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        public_id: publicId,
        overwrite: true,
        resource_type: "image",
        transformation: [
          { width: 1200, height: 1200, crop: "limit" },
          { quality: "auto", fetch_format: "auto" },
        ],
      },
      (err, result) => {
        if (err) return reject(err);
        resolve(result.secure_url);
      },
    );

    stream.end(buffer);
  });
}

module.exports = { uploadImage, cloudinaryEnabled };
