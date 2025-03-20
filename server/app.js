const express = require('express');
const dotenv = require('dotenv');

/* Initialize Express */
const app = express();

/* Middleware */

/* Routes */
app.get('/get-bridges', (req, res) => {
    res.send('Repsonse');
});

/* Configure port */
const port = process.env.SERVER_PORT || 3001;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});
