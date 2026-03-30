require('dotenv').config();
const express = require('express');
const registerRoutes = require('./routes');

const PORT = process.env.PORT || 5000;

const app = express();

registerRoutes(app);

app.use(express.json());

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

const server = app.listen(PORT, () => {
  console.log(`API Gateway listening on http://localhost:${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(
      `Port ${PORT} is already in use. Close the other app (e.g. another terminal running the gateway) or set PORT to a different value in .env.`
    );
  } else {
    console.error(err);
  }
  process.exit(1);
});
