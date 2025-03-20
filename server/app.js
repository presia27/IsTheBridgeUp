const express = require('express');
require('dotenv').config();
const connector = require('./dbconfig/pgconnector');

/* Initialize Express */
const app = express();

/* Middleware */

/* Routes */
app.get('/get-bridges', async (req, res) => {
    const queryCols = "id, name, region"; // columns to use for query
    let bridgeData = await getBridges(queryCols, -1);
    let bridgeWrap = {"bridges": bridgeData};
    res.send(bridgeWrap);
});

app.get('/get-bridge-by-id', async (req, res) => {
    const searchMethod = "id";
    const requestedId = req.query.id;
    const queryCols = "*"; // query all
    let bridgeData = await getBridges(queryCols, requestedId, searchMethod);
    res.send(bridgeData);
});


/* Helper functions */
// Set bridgeId to -1 for all bridges
// Method refers to the search parameter (e.g. search by id, name, etc.)
const getBridges = async (queryCols, bridgeId, method) => {
    let query = `SELECT ${queryCols} FROM bridges`;
    if ((bridgeId != null && bridgeId != undefined && bridgeId != -1)
            && (method != null && method != undefined)) {
        query += ` WHERE ${method}='${bridgeId}'`;
    }

    const result = await connector.query(
        query
    );
    //console.log(result.rows);
    return result.rows;
}

/* Configure port */
const port = process.env.SERVER_PORT || 3001;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
