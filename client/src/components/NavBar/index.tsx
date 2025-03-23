import React from 'react';
import { Link } from 'react-router-dom';
import Style from './index.module.css';
import navLogo from '../../assets/img/bridge_circleIcon.svg';

const NavBar: React.FC = () => {
    return (
        <div className={Style.aaaNavWrap}>
            <div className={Style.aaaNav}>
                <div className={Style.navLeft}>
                    <Link to="/" className={Style.logoLink}>
                        <img src={navLogo} alt="Is The Bridge Up Logo" width="64" height="64" />
                        <h1>Is The Bridge Up?</h1>
                    </Link>
                </div>
                <div className={Style.navRight}>
                    <div className={Style.navLink}>
                        <a href="">API</a>
                    </div>
                    <div className={Style.navLink}>
                        <a href="">FAQ</a>
                    </div>
                    <div className={Style.navLink}>
                        <Link to="/about">About</Link>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default NavBar;
