import React, { useContext } from 'react';
import BridgeContext from '../../context/BridgeContext';
import Style from './index.module.css';
import BridgeMon from '../../components/BridgeMon';

interface BridgeCard {
    bridgeName: string;
    isOpen: boolean;
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
                        bridgeName={bridge['name']}
                        isOpen={bridge['status'] == 'Down' ? false : true}
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
                    <div>Area: {region}</div>
                    <div>Last Update: {new Date(lastUpdate).toLocaleTimeString()}</div>
                </div>
            </div>
        </div>
    );
}

export default Home;
