const express = require("express");
const asyncHandler = require("../middleware/asyncHandler");
const requireAuth = require("../middleware/requireAuth");
const { validateCreate } = require("../middleware/validateRecentlySold");
const { listRecentlySold, createRecentlySold } = require("../controllers/recentlySoldController");

const router = express.Router();

router.get("/", asyncHandler(listRecentlySold));
router.post("/", requireAuth, validateCreate, asyncHandler(createRecentlySold));

module.exports = router;
