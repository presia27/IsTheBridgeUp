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

    const fetchAllBridgeData = () => {
        const apiRoute = "get-all-bridge-data"

        return new Promise(async (resolve) => {
            try {
                console.log("[BridgeMon;] Fetching bridge data");
                const response = await axios.get(API_BASEURL + apiRoute);

                setUpdateTime(response.data["LastUpdate"]);
                setBridgeList(response.data["bridges"]);

                resolve(true);
            } catch (err) {
                console.error("An error occured: " + err);
            }
        });
    }

    useEffect(() => {
        fetchAllBridgeData().then(() => {
            console.log(updateTime);
            console.log(bridgeList);
        })
    }, []);

    return (
        <div className={Style.mainContent}>
            <BridgeMonCard name="1st Ave" isOpen={false} />
            <BridgeMonCard name="Ballard" isOpen={true} />
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
