const express = require('express');
require('dotenv').config();
const nocache = require('nocache');
const connector = require('./dbconfig/pgconnector');
const { getBridgeData, findBridge } = require('./controllers/sdotConnector');

/* Initialize Express */
const app = express();
app.use(nocache()); // DISABLE caching for clients

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
    
    res.send(await getExternalData(bridgeData));
});

app.get('/get-bridge-by-name', async (req, res) => {
    const searchMethod = "name";
    const requestedName = req.query.name;
    const queryCols = "*";
    let bridgeData = await getBridges(queryCols, requestedName, searchMethod);

    res.send(await getExternalData(bridgeData));
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

const getExternalData = async (bridgeData) => {
    // Add metadata to bridge API response
    let dataWrapper = {
        "LastUpdate": null,
        "bridges": [

        ]
    };

    // null check
    if (bridgeData != null && bridgeData != undefined) {
        // Get bridge data from external API
        const extData = await getBridgeData();

        // Null check before adding date
        if (extData != null && extData != undefined) {
            dataWrapper["LastUpdate"] = extData["LastUpdate"];
        } else {
            return dataWrapper; // exit here if no data was returned
        }

        // loop through all bridges
        for (var i = 0; i < bridgeData.length; i++) {
            // store internal data before sanitizing it
            const externalApiId = parseInt(bridgeData[i]["externalapi_id"]);
            const apiProvider = bridgeData[i]["apiprovider"];

            // Add bridge status to object
            const bridgeStatus = findBridge(extData["data"], externalApiId);
            if (bridgeStatus["Status"] == "Closed") {
                bridgeData[i]["status"] = "Down";
            } else {
                bridgeData[i]["status"] = "Up";
            }

            // Sanitize data
            delete bridgeData[i]["externalapi_id"];
            delete bridgeData[i]["apiprovider"];

            dataWrapper["bridges"].push(bridgeData[i]);
        }

    }
    return dataWrapper;
}



/* Configure port */
const port = process.env.SERVER_PORT || 3001;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
