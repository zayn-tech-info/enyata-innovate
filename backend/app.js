const express = require("express");

const app = express();
const cors = require('cors');
app.use(cors());

app.use(express.json());

// Routes
app.use("/api/auth", require("./src/routes/auth.routes"));
app.use('/api/circles', require('./src/routes/circles.routes'));
app.use("/", ()=>{"Welcome to Circle Pay API"});

module.exports = app;
