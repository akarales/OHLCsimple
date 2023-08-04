//dataControllers.js
const fs = require('fs');

// Read the sample dataset from the JSON file
function readSampleData(callback) {
  fs.readFile('sample_data.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading sample dataset:', err);
      callback(err, null);
    } else {
      const ohlcData = JSON.parse(data);
      console.log('Sample dataset loaded successfully.');
      callback(null, ohlcData);
    }
  });
}

//Helper Function to Calculate moving OHLC Average
function calculateOHLC(data) {
    const length = data.length;
    if (length === 0) return null;
  
    // Calculate the sum of all close values in the dataset
    const sum = data.reduce((acc, item) => acc + item.close, 0);
    // Calculate the average by dividing the sum by the total number of values (number of records)
    const avg = sum / length;
    return avg;
  }


module.exports = {
  readSampleData,
  calculateOHLC,
};
