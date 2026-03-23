const express = require('express');
const cors = require('cors');
const errorMiddleware = require('./middleware/error.middleware');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
// app.use('/api/auth', require('./routes/auth.routes'));
// app.use('/api/circles', require('./routes/circles.routes'));

// Error Middleware
app.use(errorMiddleware);

module.exports = app;
