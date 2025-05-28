const axios = require('axios');
const https = require('https');
const NodeCache = require('node-cache');

/* Timer variables */
const timeDelaySeconds = 45;
const checkIntervalSeconds = 23;
const theCache = new NodeCache({stdTTL: timeDelaySeconds, checkperiod: checkIntervalSeconds}); // Time-to-live 45 seconds; check every 23 seconds for expired entries
const cacheKey = "bridgeData";

const CONFIG = {
    baseURL: 'https://web.seattle.gov/Travelers/api/Map/GetBridgeData'
}

// Fix SSL verification issue 2025-05-28
const myHttpsAgent = new https.Agent({
    rejectUnauthorized: false
});

const apiClient = axios.create({
    baseURL: CONFIG.baseURL,
    httpsAgent: myHttpsAgent
});

const getBridgeData = async () => {
    if (theCache.has(cacheKey)) { // If bridge data is ALREADY cached within the specified interval
        console.log("Fetching cached data...");
        return theCache.get(cacheKey);
    } else { // Fetch new data
        try {
            // BUSY SIGNAL: set theCache so that it it not null, blocking other requests
            theCache.set(cacheKey, {
                "LastUpdate": -1,
                "busy": true,
                "data": []
            }, 4);

            currentTime = Date.now();                   // Hold date/time of new request
            
            console.log("Fetching data from SDOT...");  // Log message to console
            const response = await apiClient.get();     // GET data from external API
            console.log("Successfully fetched data from SDOT") // notify when fetch is complete
            
            const data = JSON.parse(response.data);     // Parse returned JSON data

            // Wrap with metadata
            const metaWrapper = {
                "LastUpdate": currentTime,
                "busy": false,
                "data": data
            }

            theCache.set(cacheKey, metaWrapper); // PUT data into cache, check timer variable for TTL
            return metaWrapper;
        } catch (err) {
            console.error ("An error occured: " + err);
            const emptyData = {
                "LastUpdate": currentTime,
                "busy": false,
                "data": []
            }
            return emptyData;
        }
    }

    
}

const findBridge = (data, target) => {
    for (var i = 0; i < data.length; i++) {
        if (data[i]["BridgeID"] == target) {
            return data[i];
        }
    }

    return {}; // return empty object if not found
}

module.exports = {getBridgeData, findBridge};
