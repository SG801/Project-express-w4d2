// variables

import helmet from 'helmet'; // imports helmet library
import express from 'express'; // imports express library
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs/promises'; // Using promises for async readFile
import path from 'path';
import { fileURLToPath } from 'url';

// To resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = 3000;
const dataFilePath = path.join(__dirname, 'activities.json');

// declaring usage of helmet and nodemon

app.use(helmet.xPoweredBy()) // utilizing helmet to hide headers
app.use(express.json());

// Logs request 

app.get('/', (_req, res) => {
    res.status(200).send('Hello World!');
    console.log('Request logged:', new Date());
});

// Endpoint to serve data from data.json

  app.get('/activities', async (req, res) => {
    try {
      const data = await fs.readFile(dataFilePath, 'utf8');
      res.status(200).json(JSON.parse(data));
    } catch (error) {
      console.error('Error reading data:', error);
      res.status(500).send('Error reading data.');
    }
  });

  app.post('/activities', async (req, res) => {
    const newData = req.body;
    try {
      let jsonData = { statusCode: 200, response: { data: [] } };
  
      // Check if data.json exists
      try {
        const existingData = await fs.readFile(dataFilePath, 'utf8');
        jsonData = JSON.parse(existingData);
      } catch (readError) {
        // If data.json does not exist, initialize it with default structure
        if (readError.code === 'ENOENT') {
          console.log('data.json does not exist, initializing with default structure.');
        } else {
          throw readError;
        }
      }
  
      // Generate a new ID based on the existing data
      const newId = jsonData.response.data.length ? jsonData.response.data[jsonData.response.data.length - 1].id + 1 : 1;
      newData.id = newId;
  
      // Append new data to jsonData.response.data array
      jsonData.response.data.push(newData);
  
      // Write updated data back to data.json
      await fs.writeFile(dataFilePath, JSON.stringify(jsonData, null, 2));
  
      res.status(200).send('Data successfully saved.');
    } catch (error) {
      console.error('Error saving data:', error);
      res.status(500).send('Error saving data.');
    }
  });

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
