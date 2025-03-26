import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import { API_BASEURL } from '../../config';
import Style from './index.module.css';
import iconClosed from '../../assets/img/bridge_iconClosed.svg';
import iconOpen from '../../assets/img/bridge_iconOpen.svg';

interface BridgeMonCard {
    name: string;
    isOpen: boolean;
}

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

const CONFIG = {
    retryDelay: 1000
}

const BridgeMon: React.FC = () => {
    /* ***HOOKS*** */
    const [bridgeList, setBridgeList] = useState([]); // hold response data
    const [updateTime, setUpdateTime] = useState(0); // hold last update time
    const [reqAttempts, setReqAttempts] = useState(0); // hold number of attempts per request

    /**
     * Get data for all bridges
     * @returns Promise when bridge data has been fetched
     */
    const fetchAllBridgeData = () => {
        const apiRoute = "get-all-bridge-data"

        return new Promise(async (resolve) => {
            try {
                console.log("[BridgeMon]: Fetching bridge data");
                const response = await axios.get(API_BASEURL + apiRoute);

                // Check response status is 200 (OK) and data type for 'data' is 'Object'
                if (response.status === 200 && response.data.constructor === Object) {
                    
                    // Sort response data by bridge ID
                    if (response.data["bridges"].constructor === Array) { // type check
                        response.data["bridges"].sort(dataCompare); // compare in order by bridge ID
                    }

                    setUpdateTime(response.data["LastUpdate"]);
                    setBridgeList(response.data["bridges"]);
                    setReqAttempts(0); // RESET request attempts counter after a successful request

                } else {
                    console.error("Response data is incorrect in type: " + response.data.constructor);
                }

                resolve(true);
            } catch (err) {
                if (axios.isAxiosError(err)) { // Ensure err if of Axios error type before treating it as such
                    console.error("An error occured: " + err.message); // Log axios error
                    //console.error(err.response?.status);
                    if (err.response?.status === 503) { // Handle 503 (server unable to process request) - Action: Retry
                        // Wait a few seconds and try again
                        setTimeout(() => {
                            console.log("Attempt after 500ms");
                            fetchAllBridgeData();
                        }, CONFIG.retryDelay)

                        setReqAttempts(reqAttempts + 1);
                    }
                } else { // Log all other errors
                    console.error(err);
                }
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

    /* Helper Function - Compare function (think Java Comparable) for bridge API data */
    function dataCompare(a: Bridge, b: Bridge) {
        if (a.id < b.id) {
            return -1; // a < b
        } else if (a.id > b.id) {
            return 1; // a > b
        } else {
            return 0; // must be equal
        }
    }

    /* Helper Function - Delay execution of code when desired */
    const delayMe = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    

    /* Generate page data */
    return (
        <div className={Style.bmContainer}>
            <div className={Style.bmHeader}>
                <h1>Bridge Status Right Now - Seattle, WA</h1>
            </div>
            <div className={Style.mainContent}>
                {bridgeList.map(bridge =>
                    <BridgeMonCard
                        name={bridge['name']}
                        isOpen={bridge['status'] == 'Down' ? false : true}
                        key={bridge['id']}></BridgeMonCard>
                )}
            </div>
            <div className={Style.bmSubtext}>
                <div className={Style.bmLegendArea}>
                    <div className={Style.bmLegendCard}>
                        <img src={iconClosed} alt="Legend Bridge Closed" width="48" height="48" />
                        <div>Bridge is Down</div>
                    </div>
                    <div className={Style.bmLegendCard}>
                        <img src={iconOpen} alt="Legend Bridge Open" width="48" height="48" />
                        <div>Bridge is UP</div>
                    </div>
                </div>
                
                <div>
                    <p>Updates occur about every minute. Last Update: <span className={Style.bold}>{new Date(updateTime).toLocaleTimeString()}</span></p>
                </div>
            </div>
        </div>
    );
}

const BridgeMonCard: React.FC<BridgeMonCard> = ({name, isOpen}) => {
    const altTextClosed = "Bridge is DOWN";
    const altTextOpen = "Bridge is UP";

    return (
        <div className={Style.bmCard} title={isOpen ? altTextOpen : altTextClosed}>
            <div className={Style.bmImgWrap}>
                <img
                    src={isOpen ? iconOpen : iconClosed}
                    alt={isOpen ? altTextOpen : altTextClosed}
                />
            </div>
            <div className={Style.cardLabel}>
                {name}
            </div>
        </div>
    );
}

export default BridgeMon;
