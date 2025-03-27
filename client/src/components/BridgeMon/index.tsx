import React, { useContext } from 'react';
import BridgeContext from '../../context/BridgeContext';
import Style from './index.module.css';
import iconClosed from '../../assets/img/bridge_iconClosed.svg';
import iconOpen from '../../assets/img/bridge_iconOpen.svg';

interface BridgeMonCard {
    name: string;
    isOpen: boolean;
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
