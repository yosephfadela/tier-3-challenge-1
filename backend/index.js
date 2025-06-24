const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Mock data generator
function getMockStats() {
  // Generate 30 days of data
  const days = 30;
  const today = new Date();
  const avgOrderValue = [];
  let completedTransactions = 0;
  let visitors = 0;
  const countries = ['US', 'UK', 'DE', 'FR', 'IN', 'CA', 'AU', 'BR', 'JP', 'CN'];
  const salesByCountry = countries.map(country => ({ country, sales: 0 }));

  for (let i = 0; i < days; i++) {
    const value = Math.round(50 + Math.random() * 100); // $50-$150
    avgOrderValue.push({
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - (days - 1 - i)).toISOString().slice(0, 10),
      value
    });
    const tx = Math.floor(20 + Math.random() * 80); // 20-100 transactions
    const vis = Math.floor(100 + Math.random() * 400); // 100-500 visitors
    completedTransactions += tx;
    visitors += vis;
    // Randomly assign sales to countries
    const countryIdx = Math.floor(Math.random() * countries.length);
    salesByCountry[countryIdx].sales += value * tx;
  }

  return {
    completedTransactions,
    visitors,
    avgOrderValue,
    salesByCountry: salesByCountry.map(c => ({ ...c, sales: Math.round(c.sales) }))
  };
}

app.get('/api/stats', (req, res) => {
  res.json(getMockStats());
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
