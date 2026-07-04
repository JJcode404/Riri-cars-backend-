const { Prisma } = require("@prisma/client");

class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

function notFound(req, res, next) {
  next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`));
}

function errorHandler(err, req, res, next) {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      return res.status(409).json({
        error: `A vehicle with that ${err.meta?.target?.join(", ") || "value"} already exists`,
      });
    }
    if (err.code === "P2025") {
      return res.status(404).json({ error: "Vehicle not found" });
    }
  }

  if (err instanceof Prisma.PrismaClientValidationError) {
    return res.status(400).json({ error: "Invalid vehicle data" });
  }

  const status = err.status || 500;
  const message = status === 500 ? "Internal server error" : err.message;

  if (status === 500) {
    console.error(err);
  }

  res.status(status).json({ error: message });
}

module.exports = { ApiError, notFound, errorHandler };
