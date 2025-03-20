const express = require('express');
require('dotenv').config();
const connector = require('./dbconfig/pgconnector');
const { getBridgeData, findBridge } = require('./controllers/sdotConnector');

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
    
    // store internal data before sanitizing it
    const externalApiId = parseInt(bridgeData[0]["externalapi_id"]);
    const apiProvider = bridgeData[0]["apiprovider"];

    //Get bridge data from external API
    const data = await getBridgeData();

    // Add bridge status to object
    const bridgeStatus = findBridge(data, externalApiId);
    if (bridgeStatus["Status"] == "Closed") {
        bridgeData[0]["status"] = "Down";
    } else {
        bridgeData[0]["status"] = "Up";
    }
    

    // Sanitize data
    delete bridgeData[0]["externalapi_id"];
    delete bridgeData[0]["apiprovider"];
    
    res.send(bridgeData[0]);
});

app.get('/get-bridge-by-name', async (req, res) => {
    const searchMethod = "name";
    const requestedName = req.query.name;
    const queryCols = "*";
    let bridgeData = await getBridges(queryCols, requestedName, searchMethod);
    res.send(bridgeData[0]);
})



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
