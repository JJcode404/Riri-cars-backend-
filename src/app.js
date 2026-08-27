const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const vehicleRoutes = require("./routes/vehicles");
const recentlySoldRoutes = require("./routes/recentlySold");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const app = express();

const allowedOrigins = [
  "https://riri-cars.onrender.com",
  "http://localhost:3000",
  "http://localhost:5174",
];

app.use(
  cors({
    origin: allowedOrigins,
  }),
);
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (req, res) => res.json({ status: "ok" }));
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/recently-sold", recentlySoldRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
