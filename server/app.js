const express = require('express');
require('dotenv').config({ path: "../.env" });
const cors = require('cors');
const nocache = require('nocache');
const connector = require('./dbconfig/pgconnector');
const { getBridgeData, findBridge } = require('./controllers/sdotConnector');

/* Initialize Express */
const app = express();
app.use(nocache()); // DISABLE caching for clients


/* Middleware */
app.use(cors());


/* Routes */
app.get('/get-bridges', async (req, res) => {
    const queryCols = "id, name, region"; // columns to use for query
    let bridgeData = await getBridges(queryCols, null);
    let bridgeWrap = {"bridges": bridgeData};
    res.send(bridgeWrap);
});

app.get('/get-bridge-by-id', async (req, res) => {
    const searchMethod = "id";
    const requestedId = req.query.id;
    const timetags = req.query.timetags; // get time tag flag
    const queryCols = "*"; // query all

    const timetagsbool = timetags == 'true' ? true : false; // use only a boolean value as a flag

    let bridgeData = await getBridges(queryCols, requestedId, searchMethod, timetagsbool);
    
    res.send(await getExternalData(bridgeData));
});

app.get('/get-bridge-by-name', async (req, res) => {
    const searchMethod = "name";
    const requestedName = req.query.name;
    const timetags = req.query.timetags; // get time tag flag
    const queryCols = "*"; // query all

    const timetagsbool = timetags == 'true' ? true : false; // use only a boolean value as a flag

    let bridgeData = await getBridges(queryCols, requestedName, searchMethod, timetagsbool);

    res.send(await getExternalData(bridgeData));
})

app.get('/get-all-bridge-data', async (req, res) => {
    const searchMethod = null;
    const bridgeId = null;
    const timetags = req.query.timetags; // get time tag flag
    const queryCols = "*"; // query all

    const timetagsbool = timetags == 'true' ? true : false; // use only a boolean value as a flag

    let bridgeData = await getBridges(queryCols, bridgeId, searchMethod, timetagsbool);

    res.send(await getExternalData(bridgeData));
});



/* Helper functions */
// Set bridgeId to null for all bridges
// Method refers to the search parameter (e.g. search by id, name, etc.)
const getBridges = async (queryCols, bridgeId, method, flagTimeTags = false) => {
    let query = `SELECT ${queryCols} FROM bridges`; // Hold SQL query
    // null check
    if ((bridgeId != null && bridgeId != undefined && bridgeId != -1)
            && (method != null && method != undefined)) {
        query += ` WHERE ${method}='${bridgeId}'`;
    }

    // EXECUTE QUERY
    try {
        const result = await connector.query(
            query
        );
        //console.log(result.rows);

        // Append and return data with time tags on live URLs if desired by user
        if (flagTimeTags) {
            return appendTimeTags(result.rows);
        }

        return result.rows;
    } catch (error) {
        console.error('A database error occured: ' + error);
        return {};
    }   
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

/**
 * Append the last four digits of
 * the current time to the URL
 * of the live image so that web
 * browsers know to reload the image.
 * @param {*} theData Bridge data from the database
 */
const appendTimeTags = (theData) => {
    const curTime = Date.now();
    const curTimeLastFour = curTime % 10000;

    for (var i = 0; i < theData.length; i++) {

        // Perform null check
        if (theData[i] != null && theData[i] != undefined
            && theData[i]['liveimg'] != null && theData[i]['liveimg'] != undefined
            && theData[i]['liveimg'] != '') {

            // append the last four digits of the current time in millis
            theData[i]['liveimg'] = theData[i]['liveimg'] + '?' + curTimeLastFour;
        }
    }
    return theData;
}



/* Configure port */
const port = process.env.SERVER_PORT || 3001;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
