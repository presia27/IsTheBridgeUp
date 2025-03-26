const axios = require('axios');
const NodeCache = require('node-cache');

/* Timer variables */
//const timeDelayMillis = 60000; // OLD
const timeDelaySeconds = 60;
const checkIntervalSeconds = 30;
//let lastRequestTime = 0; // default to 0, set to current time on first request // OLD
const theCache = new NodeCache({stdTTL: timeDelaySeconds, checkperiod: checkIntervalSeconds}); // Time-to-live 60 seconds; check every 30 seconds for expired entries
const cacheKey = "bridgeData";
const cacheKeyPrev = "lastBridgeData";

//let cacheData; // OLD cache

const CONFIG = {
    baseURL: 'https://web.seattle.gov/Travelers/api/Map/GetBridgeData'
}

const apiClient = axios.create({
    baseURL: CONFIG.baseURL
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
/*
const getBridgeData = async() => {
    const currentTime = Date.now();
    if (lastRequestTime == 0 || currentTime - lastRequestTime >= timeDelayMillis) {
        lastRequestTime = currentTime; // RESET timer

        try{
            console.log("Fetching data from SDOT...");
            const response = await apiClient.get();
            const data = JSON.parse(response.data);

            // Wrap with metadata
            const metaWrapper = {
                "LastUpdate": currentTime,
                "data": data
            };

            cacheData = metaWrapper;
            return metaWrapper;
        } catch(err) {
            console.error("An error occured" + err);
            cacheData = {
                "LastUpdate": currentTime,
                "data": []
            }; // clear cache data to prevent old data from being sent in error
            lastRequestTime = 0; // Immediately reload on the next request
        }

    } else {
        console.log("Fetching cached data...");
        return cacheData;
    }

    
}*/

const findBridge = (data, target) => {
    for (var i = 0; i < data.length; i++) {
        if (data[i]["BridgeID"] == target) {
            return data[i];
        }
    }

    return {}; // return empty object if not found
}

module.exports = {getBridgeData, findBridge};
