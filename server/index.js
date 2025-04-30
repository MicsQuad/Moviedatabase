// server/index.js
const express = require('express');
const app = express();
const port = 5000; // You can choose any port you prefer

app.get('/', (req, res) => {
  res.send('Hello from Express Server');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
