const fs = require('fs');

function generateRandomOHLC(timestamp) {
  const open = Math.random() * 100;
  const close = open + (Math.random() - 0.5) * 10;
  const high = Math.max(open, close) + Math.random() * 10;
  const low = Math.min(open, close) - Math.random() * 10;
  return {
    timestamp: new Date(timestamp).toISOString(),
    open: parseFloat(open.toFixed(2)),
    high: parseFloat(high.toFixed(2)),
    low: parseFloat(low.toFixed(2)),
    close: parseFloat(close.toFixed(2)),
  };
}

function generateData() {
  const data = [];
  const numDataPoints = 500000;
  const oneDay = 24 * 60 * 60 * 1000; // Milliseconds in one day
  const currentTime = Date.now();
  const oneWeekAgo = currentTime - 7 * oneDay;

  // Generate consecutive timestamps divided into the past 7 days
  const interval = Math.floor(numDataPoints / 7);
  for (let i = 0; i < numDataPoints; i++) {
    const timestamp = oneWeekAgo + Math.floor(i / interval) * oneDay;
    data.push(generateRandomOHLC(timestamp));
  }

  return data;
}

const data = generateData();
fs.writeFileSync('test_data.json', JSON.stringify(data, null, 2));
console.log('Sample data generated and saved to sample_data.json');
