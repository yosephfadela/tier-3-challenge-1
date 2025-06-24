const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
const getMockStats = require('./getMockStats');

app.use(cors());

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.get('/api/stats', (req, res) => {
  res.json(getMockStats());
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
