const fs = require('fs');

// Function to generate a random number within a range
function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

// Function to generate a random timestamp within a range
function getRandomTimestamp(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// Function to generate a single OHLC record
function generateOHLCRecord() {
  const now = new Date();
  const startTime = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000); // 7 days ago from now
  const timestamp = getRandomTimestamp(startTime, now);
  const open = getRandomNumber(1, 100);
  const high = getRandomNumber(open, 100);
  const low = getRandomNumber(1, open);
  const close = getRandomNumber(low, high);

  return {
    timestamp: timestamp.toISOString(),
    open,
    high,
    low,
    close,
  };
}

// Function to generate the sample dataset for the past week
function generateSampleDataSet(numRecords) {
  const data = [];
  for (let i = 0; i < numRecords; i++) {
    const record = generateOHLCRecord();
    data.push(record);
  }
  return data;
}

// Generate 500,000 sample OHLC records for the past week
const sampleData = generateSampleDataSet(500000);

// Write the sample dataset to a JSON file
fs.writeFile('sample_dataset.json', JSON.stringify(sampleData, null, 2), (err) => {
  if (err) {
    console.error('Error writing sample dataset:', err);
  } else {
    console.log('Sample dataset created successfully.');
  }
});
