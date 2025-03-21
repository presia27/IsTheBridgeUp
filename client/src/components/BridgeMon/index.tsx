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

const BridgeMon: React.FC = () => {
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
                console.log("[BridgeMon:] Fetching bridge data");
                const response = await axios.get(API_BASEURL + apiRoute);

                setUpdateTime(response.data["LastUpdate"]);
                setBridgeList(response.data["bridges"]);

                resolve(true);
            } catch (err) {
                console.error("An error occured: " + err);
            }
        });
    }

    /* ***FETCH bridge data on load*** */
    useEffect(() => {
        fetchAllBridgeData()
    }, []);

    /* Generate page data */
    return (
        <div>
            <div className={Style.mainContent}>
                {bridgeList.map(bridge =>
                    <BridgeMonCard
                        name={bridge['name']}
                        isOpen={bridge['status'] == 'Down' ? false : true}
                        key={bridge['id']}></BridgeMonCard>
                )}
            </div>
            <p>Updated at {new Date(updateTime).toLocaleTimeString()}</p>
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
                    width="96"
                    height="96"
                />
            </div>
            <div className={Style.cardLabel}>
                {name}
            </div>
        </div>
    );
}

export default BridgeMon;
