// variables

import helmet from 'helmet'; // imports helmet library
import express from 'express'; // imports express library
const app = express(); // express app variable

// declaring usage of helmet and nodemon

app.use(helmet.xPoweredBy()) // utilizing helmet to hide headers

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

