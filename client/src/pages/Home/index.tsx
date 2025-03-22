import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import { API_BASEURL } from '../../config';
import Style from './index.module.css';
import BridgeMon from '../../components/BridgeMon';

type Bridge = {
    id: string;
    name: string;
    region: string;
    latitude: number;
    longitude: number;
    staticimg: string;
    liveimg: string;
    status: string;
}

interface BridgeCard {
    bridgeName: string;
    isOpen: boolean;
    region: string;
    lastUpdate: number;
    liveImg: string;
}

const Home: React.FC = () => {
    /* ***HOOKS*** */
    const [bridgeList, setBridgeList] = useState([]); // hold response data
    const [updateTime, setUpdateTime] = useState(0); // hold last update time

    /**
     * Get data for all bridges
     * @returns Promise when bridge data has been fetched
     */
    const fetchAllBridgeData = () => {
        const apiRoute = "get-all-bridge-data"

        return new Promise(async (resolve) => {
            try {
                console.log("[BridgeMon]: Fetching bridge data");
                const response = await axios.get(API_BASEURL + apiRoute, {params: {timetags: true}});

                // Check response status is 200 (OK) and data type for 'data' is 'Object'
                if (response.status === 200 && response.data.constructor === Object) {
                    
                    // Sort response data by bridge ID
                    if (response.data["bridges"].constructor === Array) { // type check
                        response.data["bridges"].sort(dataCompare); // compare in order by bridge ID
                    }

                    setUpdateTime(response.data["LastUpdate"]);
                    setBridgeList(response.data["bridges"]);
                } else {
                    console.error("Response data is incorrect in type: " + response.data.constructor);
                }

                resolve(true);
            } catch (err) {
                console.error("An error occured: " + err);
            }
        });
    }

    /* ***FETCH bridge data on load */
    useEffect(() => {
        fetchAllBridgeData();
    }, []);

    /* ***FETCH bridge data on 60 second intervals*** */
    useEffect(() => {
        setTimeout(() => {
            fetchAllBridgeData();
        }, 60000); // Refresh every 1 minute
    });

    /* Helper Method - Compare function (think Java Comparable) for bridge API data */
    function dataCompare(a: Bridge, b: Bridge) {
        if (a.id < b.id) {
            return -1; // a < b
        } else if (a.id > b.id) {
            return 1; // a > b
        } else {
            return 0; // must be equal
        }
    }
    
    /* ***Main page Content*** */
    return (
        <div className={Style.homeContent}>
            <BridgeMon></BridgeMon>
            <div className={Style.bridgeList}>
                {bridgeList.map(bridge => 
                    <BridgeCard
                        bridgeName={bridge['name']}
                        isOpen={bridge['status'] == 'Down' ? false : true}
                        region={bridge['region']}
                        lastUpdate={updateTime}
                        liveImg={bridge['liveimg']}
                        key={bridge['id']}>
                    </BridgeCard>
                )}
            </div>
            
        </div>
    );
}

const BridgeCard: React.FC<BridgeCard> = ({bridgeName, isOpen, region, lastUpdate, liveImg}) => {
    const liveImgAltText = "Live image of the " + bridgeName + " bridge";
    return (
        <div className={Style.bCard}>
            <div className={Style.liveImg}>
                <img src={liveImg} alt={liveImgAltText} />
            </div>

            <div className={Style.rightHandContent}>
                <div className={Style.cardHeader}>
                    <h1>{bridgeName}</h1>
                    <h2 >
                        Status:
                        <span className={isOpen ? Style.bridgeUpText : Style.bridgeDownText}>
                            {isOpen ? " UP" : " Down"}
                        </span>
                    </h2>
                </div>

                <div className={Style.cardSubHead}>
                    <div>Region: {region}</div>
                    <div>Last Update: {new Date(lastUpdate).toLocaleTimeString()}</div>
                </div>
            </div>
        </div>
    );
}

export default Home;
