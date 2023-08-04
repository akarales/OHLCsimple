const express = require('express');
const bodyParser = require('body-parser');
const dataController = require('./dataController');

const router = express.Router(); // Create an instance of the express router
router.use(bodyParser.json());

// POST Endpoint to Add Data
router.post('/api/insert', (req, res) => {
  const newRecord = req.body;
  // Add the new record to the dataset
  dataController.readSampleData((err, ohlcData) => {
    if (err) {
      res.status(500).send('Error reading sample dataset.');
    } else {
      ohlcData.push(newRecord);
      res.status(201).send('Data added successfully.');
    }
  });
});

// GET Endpoint to Compute Moving Average
router.get('/api/average', (req, res) => {
    const window = req.query.window;
  
    dataController.readSampleData((err, ohlcData) => {
      if (err) {
        res.status(500).send('Error reading sample dataset.');
      } else {
        if (window === 'last_5_items') {
          // Get the last 5 records from the dataset
          const lastFiveData = ohlcData.slice(-5);
          // Calculate the moving average for the last 5 records
          const movingAverage = dataController.calculateOHLC(lastFiveData);
          res.json({ movingAverage });
        } else if (window === 'last_24_hours') {
          // Get the timestamp 24 hours ago
          const twentyFourHoursAgo = new Date();
          twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);
          // Filter the dataset to include only the records from the last 24 hours
          const filteredData = ohlcData.filter((item) => new Date(item.timestamp) >= twentyFourHoursAgo);
          // Calculate the moving average for the filtered records
          const movingAverage = dataController.calculateOHLC(filteredData);
          res.json({ movingAverage });
        } else {
          // Invalid window parameter provided
          res.status(400).send('Invalid window parameter.');
        }
      }
    });
  });
  

// Root URL path ("/") to handle requests
router.get('/', (req, res) => {
  const cssStyles =  `
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }

    h1 {
      color: #333;
    }

    h2 {
      color: #555;
    }

    p {
      color: #777;
    }

    code {
      font-family: "Courier New", monospace;
      background-color: #f5f5f5;
      padding: 2px 4px;
      border-radius: 4px;
    }

    ol {
      padding-left: 20px;
    }

    pre {
      background-color: #f5f5f5;
      padding: 10px;
      border-radius: 4px;
      overflow-x: auto;
    }
  </style>
`;

  const projectSetupInstructions = `
  <h1>Setting Up the Project</h1>
  <p>To create this project from scratch and install the required dependencies, follow these steps:</p>

  <ol>
    <li>Create a new project folder and navigate to it in the terminal or command prompt.</li>
    <li>Initialize the project by running the following command:</li>
    <pre>
npm init
    </pre>
    <li>Follow the prompts to set up the project details. Press Enter to use the default values if you prefer.</li>
    <li>Install the required dependencies (express, body-parser, and nodemon) by running the following command:</li>
    <pre>
npm install express body-parser nodemon --save
    </pre>
    <li>Create the <code>api_with_sample_data.js</code> file and use the provided code to implement the OHLC Moving Average API and generate the sample dataset.</li>
  </ol>
`;

  const instructions = `
  <h2>Testing the API using Postman:</h2>

  <ol>
    <li>Start your API server by running the <code>api_with_sample_data.js</code> script:</li>
    <pre>
nodemon api_with_sample_data.js
    </pre>

    <li>Open Postman and create a new request collection to organize your API tests.</li>

    <li>Create a new request to test the <code>POST /api/insert</code> endpoint:</li>
    <ul>
      <li>Select the HTTP method as "POST."</li>
      <li>Set the request URL to <code>http://127.0.0.1:3000/api/insert</code>.</li>
      <li>Go to the "Body" tab in Postman, select "raw," and choose "JSON" from the dropdown.</li>
      <li>Add the JSON payload for the OHLC data you want to insert, for example:</li>
      <pre>
{
"timestamp": "2023-08-03T12:00:00Z",
"open": 10.5,
"high": 11.2,
"low": 9.8,
"close": 11.0
}
      </pre>
      <li>Click the "Send" button to send the POST request. You should receive a "Data added successfully" response.</li>
    </ul>

    <li>Create a new request to test the <code>GET /api/average?window=last_5_items</code> endpoint:</li>
    <ul>
      <li>Select the HTTP method as "GET."</li>
      <li>Set the request URL to <code>http://127.0.0.1:3000/api/average?window=last_5_items</code>.</li>
      <li>Click the "Send" button to send the GET request. You should receive a response with the moving average of the last 5 items.</li>
    </ul>

    <li>Create another request to test the <code>GET /api/average?window=last_24_hours</code> endpoint:</li>
    <ul>
      <li>Select the HTTP method as "GET."</li>
      <li>Set the request URL to <code>http://127.0.0.1:3000/api/average?window=last_24_hours</code>.</li>
      <li>Click the "Send" button to send the GET request. You should receive a response with the moving average of all items inserted in the past 24 hours.</li>
    </ul>
  </ol>
`;

  const htmlResponse = `<!DOCTYPE html>
  <html>
    <head>
      <title>OHLC Moving Average API</title>
      ${cssStyles}
    </head>
    <body>
      ${projectSetupInstructions}
      ${instructions}
    </body>
  </html>
`;

  res.send(htmlResponse);
});

module.exports = router;
