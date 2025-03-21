import React from 'react';
import Style from './index.module.css';
import navLogo from '../../assets/img/bridge_circleIcon.svg';

const NavBar: React.FC = () => {
    return (
        <div className={Style.aaaNavWrap}>
            <div className={Style.aaaNav}>
                <div className={Style.navLeft}>
                    <img src={navLogo} alt="Is The Bridge Up Logo" width="96" height="96" />
                    <h1>Is The Bridge Up?</h1>
                </div>
                <div className={Style.navRight}>
                    <div className={Style.navLink}>
                        <a href="">API</a>
                    </div>
                    <div className={Style.navLink}>
                        <a href="">FAQ</a>
                    </div>
                    <div className={Style.navLink}>
                        <a href="">About</a>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default NavBar;
