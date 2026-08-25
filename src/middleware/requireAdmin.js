const { ApiError } = require("./errorHandler");

function isAdmin(user) {
  if (!user) return false;
  if (
    user.role === "admin" ||
    user.app_metadata?.role === "admin" ||
    user.user_metadata?.role === "admin"
  ) {
    return true;
  }

  const adminEmails = (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);

  return (
    adminEmails.length > 0 &&
    typeof user.email === "string" &&
    adminEmails.includes(user.email.toLowerCase())
  );
}

function requireAdmin(req, res, next) {
  if (!isAdmin(req.user)) {
    return next(new ApiError(403, "Admin access required"));
  }
  next();
}

module.exports = requireAdmin;
