async function requireAuth(req, res, next) {
  const authorization = req.headers.authorization;
  const token = authorization?.startsWith("Bearer ")
    ? authorization.slice("Bearer ".length).trim()
    : "";

  if (!token) {
    return res.status(401).json({ message: "Missing bearer token" });
  }

  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_PUBLISHABLE_KEY) {
    console.error(
      "SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY are required for auth",
    );
    return res
      .status(500)
      .json({ message: "Authentication is not configured" });
  }

  try {
    const response = await fetch(`${process.env.SUPABASE_URL}/auth/v1/user`, {
      headers: {
        apikey: process.env.SUPABASE_PUBLISHABLE_KEY,
        authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    req.user = await response.json();
    next();
  } catch (error) {
    console.error("Supabase auth request failed", error);
    return res
      .status(503)
      .json({ message: "Authentication service unavailable" });
  }
}

module.exports = requireAuth;
