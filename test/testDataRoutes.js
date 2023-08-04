const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const app = require('../dataRoutes');

describe('Data Routes', function () {
  it('should add new data on POST /api/insert', function (done) {
    const newRecord = {
      timestamp: '2023-08-03T12:00:00Z',
      open: 10.5,
      high: 11.2,
      low: 9.8,
      close: 11.0,
    };

    request(app)
      .post('/api/insert')
      .send(newRecord)
      .expect(201)
      .end(function (err, res) {
        expect(res.text).to.equal('Data added successfully.');
        done(err);
      });
  });

  it('should calculate the moving average for the last 5 items on GET /api/average?window=last_5_items', function (done) {
    request(app)
      .get('/api/average?window=last_5_items')
      .expect(200)
      .end(function (err, res) {
        expect(res.body).to.have.property('movingAverage');
        // Add additional assertions based on your implementation of the moving average
        // For example:
        // expect(res.body.movingAverage).to.be.a('number');
        done(err);
      });
  });

  it('should calculate the moving average for the last 24 hours on GET /api/average?window=last_24_hours', function (done) {
    request(app)
      .get('/api/average?window=last_24_hours')
      .expect(200)
      .end(function (err, res) {
        expect(res.body).to.have.property('movingAverage');
        // Add additional assertions based on your implementation of the moving average
        // For example:
        // expect(res.body.movingAverage).to.be.a('number');
        done(err);
      });
  });
});
