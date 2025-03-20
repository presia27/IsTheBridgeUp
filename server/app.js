const express = require('express');
require('dotenv').config();
const connector = require('./dbconfig/pgconnector');

/* Initialize Express */
const app = express();

/* Middleware */

/* Routes */
app.get('/get-bridges', async (req, res) => {
    const queryCols = "id, name, region"; // columns to use for query
    let bridgeData = await getAllBridges(queryCols);
    res.send(bridgeData);
});


/* Helper functions */
const getAllBridges = async (queryCols) => {
    const result = await connector.query(
        `SELECT ${queryCols} FROM bridges`
    );
    //console.log(result.rows);
    return result.rows;
}

/* Configure port */
const port = process.env.SERVER_PORT || 3001;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
