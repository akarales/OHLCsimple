# OHLCsimple
API that computes a moving average across OHLC data
main.js

dummy set data generated from test file.
generate_sample_data.js
generate_test_data.js

Setting Up the Project
To create this project from scratch and install the required dependencies, follow these steps:

Create a new project folder and navigate to it in the terminal or command prompt.
Initialize the project by running the following command:
  npm init
        
Follow the prompts to set up the project details. Press Enter to use the default values if you prefer.
Install the required dependencies (express, body-parser, and nodemon) by running the following command:
  npm install express body-parser nodemon --save

Run the generate_sample_data.js script to create the sample_dataset.json file with 500,000 entries of sample OHLC data:

node generate_sample_data.js

Create the main.js file and use the provided code to implement the OHLC Moving Average API and generate the sample dataset.
Testing the API using Postman:
Start your API server by running the main.js script:
  nodemon main.js
        
Open Postman and create a new request collection to organize your API tests.
Create a new request to test the POST /api/insert endpoint:
Select the HTTP method as "POST."
Set the request URL to http://127.0.0.1:3000/api/insert.
Go to the "Body" tab in Postman, select "raw," and choose "JSON" from the dropdown.
Add the JSON payload for the OHLC data you want to insert, for example:
  {
    "timestamp": "2023-08-03T12:00:00Z",
    "open": 10.5,
    "high": 11.2,
    "low": 9.8,
    "close": 11.0
  }
          
Click the "Send" button to send the POST request. You should receive a "Data added successfully" response.
Create a new request to test the GET /api/average?window=last_5_items endpoint:
Select the HTTP method as "GET."
Set the request URL to http://127.0.0.1:3000/api/average?window=last_5_items.
Click the "Send" button to send the GET request. You should receive a response with the moving average of the last 5 items.
Create another request to test the GET /api/average?window=last_24_hours endpoint:
Select the HTTP method as "GET."
Set the request URL to http://127.0.0.1:3000/api/average?window=last_24_hours.
Click the "Send" button to send the GET request. You should receive a response with the moving average of all items inserted in the past 24 hours.

run test files in the test folder with:
npx mocha