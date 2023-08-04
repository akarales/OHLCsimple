//main.js
const app = require('./dataRoutes');

// Starting the Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}.`);
});