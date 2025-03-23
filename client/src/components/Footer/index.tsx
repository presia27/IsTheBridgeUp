import React from 'react';
import Style from './index.module.css';

const Footer: React.FC = () => {
    return (
        <div className={Style.footerMain}>
            <div>
                Data is pulled as-is from
                the <a href="https://www.seattle.gov/transportation" target="_blank">
                    Seattle Department of Transportation
                </a> and
                the <a href="https://wsdot.wa.gov/" target="_blank">Washington State Department of Transportation</a> with
                no guarantee of accuracy.
            </div>
            <div>
                Copyright (c) {new Date().getFullYear()} Preston Sia (
                    <a href="https://github.com/presia27" target="_blank">presia27</a>)
            </div>
            <div>
                <br /><br />
                Disclaimer: The information provided on this site is for informational
                purposes only. By continuing to use this site, you assume all risk of use and
                understand that the developers of this software are not liable for any delays or
                damages of any kind that are a result of using the information provided by this site/API. 
                <br /><br />
                Advisory: Washington State law prohibits the use of personal electronic
                devices while operating a motor vehicle on public
                roads, with a few specific exceptions such as the use of personal electronics
                to report an emergency as specified
                under <a href="https://app.leg.wa.gov/rcw/default.aspx?cite=46.61.672" target="_blank">
                    RCW 46.61.672
                </a>.
                Please do not use this software while driving.
            </div>
        </div>
    );
}

export default Footer;
