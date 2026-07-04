const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const vehicleRoutes = require("./routes/vehicles");
const recentlySoldRoutes = require("./routes/recentlySold");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (req, res) => res.json({ status: "ok" }));
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/recently-sold", recentlySoldRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
