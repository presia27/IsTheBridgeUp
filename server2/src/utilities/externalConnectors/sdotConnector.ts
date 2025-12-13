import axios from 'axios';
import https from 'https'
import NodeCache from 'node-cache';
import { getSdotMock as sdotService } from './mock/sdotMock';

const CONFIG = {
  baseURL: 'https://web.seattle.gov/Travelers/api/Map/GetBridgeData',
  timeDelaySeconds: 45,
  expireCheckIntervalSeconds: 23
}

// Allows the API to return data from a cache instead of pinging the external API for every request
const bridgeCache = new NodeCache(
  {
    stdTTL: CONFIG.timeDelaySeconds,
    checkperiod: CONFIG.expireCheckIntervalSeconds,
    deleteOnExpire: false
  });
const cacheKey = "bridgeData";
let writeFlag = false;

// allow writing/new requests when the data expires
bridgeCache.on('expired', function(key, value) {
  writeFlag = true;
});

// insert empty, already expired value
const noData: bridgeDataInternal = {
  lastUpdate: Date.now(),
  data: []
}
bridgeCache.set(cacheKey, noData, 1); // 1 seconds ttl - expires almost immediately

/* Ignore SSL problems */

const httpsAgent = new https.Agent({
  rejectUnauthorized: false
});

/* Axios instance */

// const sdotService = axios.create({
//   baseURL: CONFIG.baseURL,
//   httpsAgent: httpsAgent
// });

interface sdotDataFormat {
  BridgeID: number;
  DisplayName: string;
  Latitude: number;
  Longitude: number;
  Name: string;
  Status: 'open' | 'closed';
}

interface bridgeDataInternal {
  lastUpdate: number,
  data: sdotDataFormat[]
}

const getBridgeData = async () => {
  if (bridgeCache.has(cacheKey) && !writeFlag) {
    // If bridge data is ALREADY cached within the specified interval
    console.log("Fetching cached data...");
    return bridgeCache.get(cacheKey);
  }

  if (writeFlag) {
    writeFlag = false;

    await sdotService.get('/').then((response) => {
      console.log('Successfully fetched data from SDOT');
      const parsedData = JSON.parse(response.data); // SDOT always sends stringified data

      const bridgeDataWrapped: bridgeDataInternal = {
        lastUpdate: Date.now(),
        data: parsedData
      }

      bridgeCache.set(cacheKey, bridgeDataWrapped);
      return bridgeDataWrapped;
    }).catch((error) => {
      console.error("An error occured when trying to connect to API: " + error);
    });

  }

  // fallback return
  return noData;
}
