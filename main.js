// main.js

const express = require('express');
const { OpenApiValidator } = require('express-openapi-validator');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const dataRoutes = require('./dataRoutes');

const app = express(); // Create an Express app

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Serve the Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(require('./openapi.json')));

// Mount the dataRoutes on the root URL
app.use('/', dataRoutes);

// Error handler for OpenAPI validation errors
app.use((err, req, res, next) => {
  if (err.status === 400) {
    // Bad request - validation failed
    res.status(400).json({
      message: 'Validation error',
      errors: err.errors,
    });
  } else {
    // Other errors, e.g., 500 - internal server error
    res.status(err.status || 500).json({
      message: err.message,
      errors: err.errors,
    });
  }
});

// Starting the Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}.`);
});
