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
                <h1>FAQ</h1>
                <h2>How often is the data updated?</h2>
                <p>
                    Data is pulled from transportation agencies (the Seattle Department of
                    transportation) in this case. Data is accessed no more frequently than
                    once per minute to prevent spamming their server. Because of this,
                    you may notice a delay between the still frames and status descriptions,
                    or delays between the actual open and close of the bridge.
                </p>

                <h2>Sometimes the site says a bridge is down, but the photo clearly shows that the bridge is up. Why is this?</h2>
                <p>
                    It's possible that the image got updated before the rest of the information, so you might need to refresh the page.
                    I'm also still working on ironing out a few bugs. In addition, it may be due to the the transportation agencies' data
                    themsleves, since this site relies on them. However, I can make no guarantees of accuracy.
                </p>

                <h2>What is your motivation for developing this?</h2>
                <p>
                    I often use the 1st Avenue Bridge when I need to drive into
                    or out of Seattle. Unfortunately, I occasionally miss the electronic signs,
                    or in some cases (particularly when driving south on SR99), there are no
                    electronic signs that I can easily spot. I wrote the API with the hope of
                    being able to develope something that could easily use or present the information,
                    and the frontend allows me to showcase it.
                </p>

                <h2>Do you have source code available for this?</h2>
                <p>
                    Source code for this project is available on
                    GitHub: <a href="https://github.com/presia27/IsTheBridgeUp">https://github.com/presia27/IsTheBridgeUp</a>
                </p>

                <h2>Can you make this for my city?</h2>
                <p>
                    Unfortunately the amount of free time I have these days is limited. Depending on how this project goes,
                    I may consider it at a later time. In addition, if you are a developer, you are welcome to take a look
                    at my code as an example and develope your own version, though I ask that you modify the appearance
                    and content and make it your own.
                </p>
            </div>
        </div>
    );
}

export default FAQ;
