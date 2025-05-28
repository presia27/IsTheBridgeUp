import React, { useContext } from 'react';
import { HashLink } from 'react-router-hash-link';
import BridgeContext from '../../context/BridgeContext';
import Style from './index.module.css';
import BridgeMon from '../../components/BridgeMon';

interface BridgeCard {
    id: string;
    bridgeName: string;
    status: string;
    region: string;
    lastUpdate: number;
    liveImg: string;
}

const Home: React.FC = () => {
    /* ***HOOKS*** */


    // React Context Hooks
    const {bridgeList, updateTime} = useContext(BridgeContext);
    
    /* ***Main page Content*** */
    return (
        <div className={Style.homeContent}>
            <BridgeMon></BridgeMon>
            <div className={Style.bridgeList}>
                {bridgeList.map(bridge => 
                    <BridgeCard
                        id={bridge['id']}
                        bridgeName={bridge['name']}
                        status={bridge['status']}
                        region={bridge['region']}
                        lastUpdate={updateTime}
                        liveImg={bridge['liveimg']}
                        key={bridge['id']}>
                    </BridgeCard>
                )}
            </div>
            <div>
                <br />
                Note that the camera frames might not be in sync with
                the rest of the data. Please check both.
            </div>
        </div>
    );
}

const BridgeCard: React.FC<BridgeCard> = ({id, bridgeName, status, region, lastUpdate, liveImg}) => {
    const liveImgAltText = "Live image of the " + bridgeName + " bridge";

    let statusText;
    let styleTag;
    if (status == "Up") {
        statusText = " UP";
        styleTag = Style.bridgeUpText;
    } else if (status == "Down") {
        statusText = " Down";
        styleTag = Style.bridgeDownText;
    } else {
        statusText = " Unknown";
        styleTag = Style.bridgeUnknownText;
    }

    return (
        <div className={Style.bCard} id={`b_id${id}`}>
            <div className={Style.liveImg}>
                <img src={liveImg} alt={liveImgAltText} />
            </div>

            <div className={Style.rightHandContent}>
                <div className={Style.cardHeader}>
                    <h1>{bridgeName}</h1>
                    <h2 >
                        Status:
                        <span className={styleTag}>
                            {statusText}
                        </span>
                    </h2>
                </div>

                <div className={Style.cardSubHead}>
                    <div>Area: {region}</div>
                    <div>Last Update: {new Date(lastUpdate).toLocaleTimeString()}</div>
                    <HashLink to='#top'>Scroll to Top</HashLink>
                </div>
            </div>
        </div>
    );
}

export default Home;
