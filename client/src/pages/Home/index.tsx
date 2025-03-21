import React from 'react';
import Style from './index.module.css';
import BridgeMon from '../../components/BridgeMon';

const Home: React.FC = () => {
    return (
        <div className={Style.homeContent}>
            <BridgeMon></BridgeMon>
        </div>
    );
}

export default Home;
