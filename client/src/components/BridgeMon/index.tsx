import React, { useContext } from 'react';
import { HashLink } from 'react-router-hash-link';
import BridgeContext from '../../context/BridgeContext';
import Style from './index.module.css';
import iconClosed from '../../assets/img/bridge_iconClosed.svg';
import iconOpen from '../../assets/img/bridge_iconOpen.svg';
import iconUnknown from '../../assets/img/bridge_iconUnknown.svg';

interface BridgeMonCard {
    id: string;
    name: string;
    status: string;
}

const BridgeMon: React.FC = () => {
    /* ***HOOKS*** */


    // React Context Hooks
    const {bridgeList, updateTime} = useContext(BridgeContext);

    /* Generate page data */
    return (
        <div className={Style.bmContainer}>
            <div className={Style.bmHeader}>
                <h1>Bridge Status Right Now - Seattle, WA</h1>
            </div>
            <div className={Style.mainContent}>
                {bridgeList.map(bridge =>
                    <BridgeMonCard
                        id={bridge['id']}
                        name={bridge['name']}
                        status={bridge['status']}
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

const BridgeMonCard: React.FC<BridgeMonCard> = ({id, name, status}) => {
    const altTextClosed = "Bridge is DOWN";
    const altTextOpen = "Bridge is UP";
    const altTextUnknown = "Bridge Status UNKNOWN";

    let altText;
    let iconToUse;
    if (status == "Up") {
        altText = altTextOpen;
        iconToUse = iconOpen;
    } else if (status == "Down") {
        altText = altTextClosed;
        iconToUse = iconClosed;
    } else {
        altText = altTextUnknown;
        iconToUse = iconUnknown;
    }

    return (
        <HashLink to={`/#b_id${id}`} className={Style.bmOuterLink}>
            <div className={Style.bmCard} title={altText}>
                <div className={Style.bmImgWrap}>
                    <img
                        src={iconToUse}
                        alt={altText}
                    />
                </div>
                <div className={Style.cardLabel}>
                    {name}
                </div>
            </div>
        </HashLink>
    );
}

export default BridgeMon;
