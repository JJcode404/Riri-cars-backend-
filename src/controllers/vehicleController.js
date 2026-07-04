const prisma = require("../lib/prisma");
const { ApiError } = require("../middleware/errorHandler");

function parseId(req) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    throw new ApiError(400, "id must be an integer");
  }
  return id;
}

function buildWhere(query) {
  const where = {};

  if (query.make) where.make = { equals: query.make, mode: "insensitive" };
  if (query.model) where.model = { equals: query.model, mode: "insensitive" };
  if (query.fuel) where.fuel = query.fuel;
  if (query.drive) where.drive = query.drive;
  if (query.condition) where.condition = query.condition;
  if (query.status) where.status = query.status;
  if (query.bodyType) where.bodyType = { equals: query.bodyType, mode: "insensitive" };

  if (query.available !== undefined) {
    where.available = query.available === "true";
  }

  if (query.minPrice || query.maxPrice) {
    where.price = {};
    if (query.minPrice) where.price.gte = Number(query.minPrice);
    if (query.maxPrice) where.price.lte = Number(query.maxPrice);
  }

  if (query.minYear || query.maxYear) {
    where.year = {};
    if (query.minYear) where.year.gte = Number(query.minYear);
    if (query.maxYear) where.year.lte = Number(query.maxYear);
  }

  if (query.search) {
    where.OR = [
      { make: { contains: query.search, mode: "insensitive" } },
      { model: { contains: query.search, mode: "insensitive" } },
      { trim: { contains: query.search, mode: "insensitive" } },
      { description: { contains: query.search, mode: "insensitive" } },
    ];
  }

  return where;
}

async function listVehicles(req, res) {
  const page = Math.max(1, Number(req.query.page) || 1);
  const pageSize = Math.min(100, Math.max(1, Number(req.query.pageSize) || 20));
  const where = buildWhere(req.query);

  const sortableFields = ["price", "year", "mileage", "createdAt"];
  const sortBy = sortableFields.includes(req.query.sortBy) ? req.query.sortBy : "createdAt";
  const sortOrder = req.query.sortOrder === "asc" ? "asc" : "desc";

  const [vehicles, total] = await Promise.all([
    prisma.vehicle.findMany({
      where,
      orderBy: { [sortBy]: sortOrder },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.vehicle.count({ where }),
  ]);

  res.json({
    data: vehicles,
    pagination: {
      page,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize),
    },
  });
}

async function getVehicle(req, res) {
  const id = parseId(req);
  const vehicle = await prisma.vehicle.findUnique({ where: { id } });
  if (!vehicle) {
    throw new ApiError(404, "Vehicle not found");
  }
  res.json(vehicle);
}

async function createVehicle(req, res) {
  const vehicle = await prisma.vehicle.create({ data: req.body });
  res.status(201).json(vehicle);
}

async function updateVehicle(req, res) {
  const id = parseId(req);
  const vehicle = await prisma.vehicle.update({ where: { id }, data: req.body });
  res.json(vehicle);
}

async function deleteVehicle(req, res) {
  const id = parseId(req);
  await prisma.vehicle.delete({ where: { id } });
  res.status(204).send();
}

module.exports = {
  listVehicles,
  getVehicle,
  createVehicle,
  updateVehicle,
  deleteVehicle,
};
