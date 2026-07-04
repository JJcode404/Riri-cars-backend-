const prisma = require("../lib/prisma");

async function listRecentlySold(req, res) {
  const take = Math.min(50, Math.max(1, Number(req.query.limit) || 10));

  const recentlySold = await prisma.recentlySold.findMany({
    orderBy: { soldAt: "desc" },
    take,
  });

  res.json({ data: recentlySold });
}

async function createRecentlySold(req, res) {
  const { year, make, model, trim, bodyType, price, image } = req.body;

  const sold = await prisma.recentlySold.create({
    data: { year, make, model, trim, bodyType, price, image },
  });

  res.status(201).json(sold);
}

module.exports = { listRecentlySold, createRecentlySold };
