const { ApiError } = require("./errorHandler");

const FUEL_TYPES = ["PETROL", "DIESEL", "HYBRID", "ELECTRIC"];
const DRIVE_TYPES = ["TWO_WD", "FOUR_WD", "AWD"];
const CONDITIONS = ["JAPAN_IMPORT", "LOCAL_USED", "BRAND_NEW"];
const STATUSES = ["NEW", "USED", "CERTIFIED_PRE_OWNED"];

const REQUIRED_FIELDS = [
  "stockNumber",
  "year",
  "make",
  "model",
  "price",
  "mileage",
  "fuel",
  "transmission",
  "engine",
  "drive",
  "bodyType",
  "exteriorColor",
  "interiorColor",
  "description",
  "image",
];

function validateCreate(req, res, next) {
  const missing = REQUIRED_FIELDS.filter((field) => req.body[field] === undefined || req.body[field] === null || req.body[field] === "");
  if (missing.length > 0) {
    return next(new ApiError(400, `Missing required field(s): ${missing.join(", ")}`));
  }
  const error = validateShared(req.body);
  next(error || undefined);
}

function validateUpdate(req, res, next) {
  const error = validateShared(req.body);
  next(error || undefined);
}

function validateShared(body) {
  if (body.fuel !== undefined && !FUEL_TYPES.includes(body.fuel)) {
    return new ApiError(400, `fuel must be one of: ${FUEL_TYPES.join(", ")}`);
  }
  if (body.drive !== undefined && !DRIVE_TYPES.includes(body.drive)) {
    return new ApiError(400, `drive must be one of: ${DRIVE_TYPES.join(", ")}`);
  }
  if (body.condition !== undefined && !CONDITIONS.includes(body.condition)) {
    return new ApiError(400, `condition must be one of: ${CONDITIONS.join(", ")}`);
  }
  if (body.status !== undefined && !STATUSES.includes(body.status)) {
    return new ApiError(400, `status must be one of: ${STATUSES.join(", ")}`);
  }
  if (body.year !== undefined && !Number.isInteger(body.year)) {
    return new ApiError(400, "year must be an integer");
  }
  if (body.price !== undefined && !Number.isInteger(body.price)) {
    return new ApiError(400, "price must be an integer");
  }
  if (body.mileage !== undefined && !Number.isInteger(body.mileage)) {
    return new ApiError(400, "mileage must be an integer");
  }
  if (body.features !== undefined && !Array.isArray(body.features)) {
    return new ApiError(400, "features must be an array of strings");
  }
  if (body.gallery !== undefined && !Array.isArray(body.gallery)) {
    return new ApiError(400, "gallery must be an array of strings");
  }
  return null;
}

module.exports = { validateCreate, validateUpdate, FUEL_TYPES, DRIVE_TYPES, CONDITIONS, STATUSES };
