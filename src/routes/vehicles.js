const express = require("express");
const asyncHandler = require("../middleware/asyncHandler");
const requireAuth = require("../middleware/requireAuth");
const requireAdmin = require("../middleware/requireAdmin");
const {
  validateCreate,
  validateUpdate,
} = require("../middleware/validateVehicle");
const { uploadVehicleImages } = require("../middleware/uploadImages");
const {
  listVehicles,
  getVehicle,
  createVehicle,
  updateVehicle,
  deleteVehicle,
} = require("../controllers/vehicleController");

const router = express.Router();

router.get("/", asyncHandler(listVehicles));
router.get("/:id", asyncHandler(getVehicle));
router.post(
  "/",
  requireAuth,
  requireAdmin,
  uploadVehicleImages,
  validateCreate,
  asyncHandler(createVehicle),
);
router.put("/:id", requireAuth, validateUpdate, asyncHandler(updateVehicle));
router.delete("/:id", requireAuth, asyncHandler(deleteVehicle));

module.exports = router;
