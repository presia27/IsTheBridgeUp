import React from 'react';
import Style from './index.module.css';
import iconClosed from '../../assets/img/bridge_iconClosed.svg';
import iconOpen from '../../assets/img/bridge_iconOpen.svg';

interface BridgeMonCard {
    name: string;
    isOpen: boolean;
}

const BridgeMon: React.FC = () => {
    return (
        <div className={Style.mainContent}>
            <BridgeMonCard name="1st Ave" isOpen={false} />
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
