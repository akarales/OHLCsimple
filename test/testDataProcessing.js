const chai = require('chai');
const expect = chai.expect;
const dataController = require('../dataController');

// Load the sample dataset from sample_data.json
const sampleData = require('../sample_data.json');

describe('Data Processing', function () {
  it('should calculate OHLC average correctly for the entire dataset', function () {
    const avg = dataController.calculateOHLC(sampleData);
    // Calculate the average of 'close' values manually based on the provided sample data
    const totalClose = sampleData.reduce((acc, item) => acc + item.close, 0);
    const expectedAvg = totalClose / sampleData.length;
    expect(avg).to.be.closeTo(expectedAvg, 0.001); // With a tolerance of 0.001
  });

  it('should return null for an empty dataset', function () {
    const emptyData = [];
    const avg = dataController.calculateOHLC(emptyData);
    expect(avg).to.be.null;
  });

  it('should calculate OHLC average correctly for a dataset with one record', function () {
    const oneRecordData = [
      { timestamp: '2023-07-28T18:18:26.678Z', open: 41.62, high: 45.77, low: 32.45, close: 45.51 },
    ];
    const avg = dataController.calculateOHLC(oneRecordData);
    expect(avg).to.equal(45.51); // The average should be equal to the only record's 'close' value
  });

  // Add more test cases if needed to test other functionalities with the entire dataset
  // For example, you can add tests for edge cases, error handling, and other functions in dataController.js
});
