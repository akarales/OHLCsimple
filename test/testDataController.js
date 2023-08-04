const chai = require('chai');
const expect = chai.expect;
const dataController = require('../dataController');

describe('Data Controller', function () {
  it('should read sample data from the file', function (done) {
    dataController.readSampleData((err, ohlcData) => {
      expect(err).to.be.null;
      expect(ohlcData).to.be.an('array');
      done();
    });
  });

  it('should calculate OHLC average correctly', function () {
    const data = [
      { open: 10, high: 12, low: 9, close: 11 },
      { open: 11, high: 13, low: 10, close: 12 },
      { open: 12, high: 14, low: 11, close: 13 },
    ];
    const avg = dataController.calculateOHLC(data);
    expect(avg).to.be.equal(12);
  });
});
