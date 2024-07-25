// variables

import helmet from 'helmet'; // imports helmet library
import express from 'express'; // imports express library
import { v4 as uuidv4 } from 'uuid';
//const app = express(); // express app variable
import fs from 'fs/promises'; // Using promises for async readFile
import path from 'path';
import { fileURLToPath } from 'url';

// To resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = 3000;

// declaring usage of helmet and nodemon

app.use(helmet.xPoweredBy()) // utilizing helmet to hide headers

// Logs request 

app.get('/', (req, res) => {
    res.status(200).send('Hello World!');
    console.log('Request logged:', new Date());
});


/*const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
 */

// Endpoint to serve data from data.json


app.get('/data', async (req, res) => {
    try {
      const dataPath = path.join(__dirname, 'data.json');
      const fileContent = await fs.readFile(dataPath, 'utf8');
      const jsonData = JSON.parse(fileContent);
  
      const statusCode = jsonData.statusCode;
      const userActivities = jsonData.response.data;
  
      // Log the data to console
      console.log('Status Code:', statusCode);
      userActivities.forEach(activity => {
        console.log(`User ${activity.userId} did: ${activity.activity} at ${new Date()}`);
        userActivities.forEach(activity => {
            activity.id = "uuidv4()"; // Generate a new UUID and assign it to the `id` field of each activity.
        });
      });
      // Send the JSON response
      res.json(jsonData);
    } catch (error) {
      console.error('Error reading or parsing file:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.post('/data', async (req, res) => {
    try {
      const dataPath = path.join(__dirname, 'data.json');
      const fileContent = await fs.readFile(dataPath, 'utf8');
      const jsonData = JSON.parse(fileContent);
  
      const statusCode = jsonData.statusCode;
      const userActivities = jsonData.response.data;
  
      // Log the data to console
      console.log('Status Code:', statusCode);
      userActivities.forEach(activity => {
        console.log(`User ${activity.userId} did: ${activity.activity} at ${new Date()}`);
        userActivities.forEach(activity => {
            activity.id = "uuidv4()"; // Generate a new UUID and assign it to the `id` field of each activity.
            const newActivity = req.body.activity;
            console.log('New activity:', newActivity);
        });
      });
      // Send the JSON response
      res.json(jsonData);
    } catch (error) {
      console.error('Error reading or parsing file:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });