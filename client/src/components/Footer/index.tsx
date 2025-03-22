import React from 'react';
import Style from './index.module.css';

const Footer: React.FC = () => {
    return (
        <div className={Style.footerMain}>
            <div>
                Data courtesy of
                the <a href="https://www.seattle.gov/transportation">
                    Seattle Department of Transportation
                </a> and
                the <a href="https://wsdot.wa.gov/">Washington State Department of Transportation</a>.
            </div>
            <div>
                Copyright (c) {new Date().getFullYear()} Preston Sia (
                    <a href="https://github.com/presia27">presia27</a>)
            </div>
        </div>
    );
}

export default Footer;
