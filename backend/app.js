const express = require("express");

const app = express();
const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use((req, res, next) => {
  console.log(req.method, req.originalUrl);
  next();
});

// Routes
app.use("/api/v1/auth", require("./src/routes/auth.routes"));
app.use('/api/v1/circles', require('./src/routes/circles.routes'));
app.get("/api/v1", (req, res) => {
  res.send("Welcome to Circle Pay API");
});
app.use((req, res, next) => {
  console.warn(`❌ 404 - ${req.method} ${req.originalUrl}`);
  res.status(404).json({ message: "Route not found" });
});

module.exports = app;
