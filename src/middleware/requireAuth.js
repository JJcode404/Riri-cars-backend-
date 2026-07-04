const { verifyAuth } = require("@supabase/server/core");

async function requireAuth(req, res, next) {
  const request = new Request(`${req.protocol}://${req.get("host")}${req.originalUrl}`, {
    headers: { authorization: req.headers.authorization || "" },
  });

  const { data, error } = await verifyAuth(request, { auth: "user" });

  if (error) {
    return res.status(error.status).json({ message: error.message });
  }

  req.user = data.userClaims;
  next();
}

module.exports = requireAuth;
