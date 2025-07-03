const { isVisitorsKpiEnabled } = require('./feature-flags');

const createBaseCountriesList = (countries) => {
  return countries.map(country => ({
    countryName: country,
    sales: 0,
    numberOfTransactions: 0
  }));
}

// Utility to generate mock stats for the dashboard
function getMockStats() {
  // Generate 30 days of data
  const days = 30;
  const today = new Date();
  const avgOrderValue = [];
  let completedTransactions = 0;
  let visitors = 0;
  const countries = ['US', 'UK', 'DE', 'FR', 'IN', 'CA', 'AU', 'BR', 'JP', 'CN'];
  const salesByCountry = createBaseCountriesList(countries);

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
    salesByCountry[countryIdx].numberOfTransactions = tx;
  }

  const payload = {
    completedTransactions,
    avgOrderValue,
    salesByCountry: salesByCountry.map(c => ({ ...c, sales: Math.round(c.sales) }))
  };

    if (isVisitorsKpiEnabled()) {
        payload.visitors = visitors;
    } else {
        payload.visitors = 0; // or some default value
    }

    return payload;
}

module.exports = getMockStats;

