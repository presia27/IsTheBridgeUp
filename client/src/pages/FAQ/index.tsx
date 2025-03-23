import React from 'react';
import Style from './index.module.css';
import BridgeMon from '../../components/BridgeMon';

const FAQ: React.FC = () => {
    return (
        <div className={Style.faqContainer}>
            <div className={Style.bridgeMonContainer}>
                <BridgeMon></BridgeMon>
            </div>

            <div className={Style.faqMainContent}>

            </div>
        </div>
    );
}

export default FAQ;
