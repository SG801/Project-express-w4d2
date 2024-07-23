// variables

import helmet from 'helmet';
import express from 'express';
const app = express();

// declaring usage of helmet

app.use(helmet.xPoweredBy())

// Logs request 

app.get('/', (req, res) => {
    res.status(200).send('Hello World!');
    console.log('Request logged:', new Date());
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});