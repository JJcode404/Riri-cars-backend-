const { ApiError } = require("./errorHandler");

const REQUIRED_FIELDS = ["year", "make", "model", "bodyType", "price", "image"];

function validateCreate(req, res, next) {
  const missing = REQUIRED_FIELDS.filter((field) => req.body[field] === undefined || req.body[field] === null || req.body[field] === "");
  if (missing.length > 0) {
    return next(new ApiError(400, `Missing required field(s): ${missing.join(", ")}`));
  }
  if (!Number.isInteger(req.body.year)) {
    return next(new ApiError(400, "year must be an integer"));
  }
  if (!Number.isInteger(req.body.price)) {
    return next(new ApiError(400, "price must be an integer"));
  }
  next();
}

module.exports = { validateCreate };
