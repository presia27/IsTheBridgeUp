const axios = require('axios');

/* Timer variables */
const timeDelayMillis = 60000;
let lastRequestTime = 0; // default to 0, set to current time on first request
let cacheData;

const CONFIG = {
    baseURL: 'https://web.seattle.gov/Travelers/api/Map/GetBridgeData'
}

const apiClient = axios.create({
    baseURL: CONFIG.baseURL
});

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
