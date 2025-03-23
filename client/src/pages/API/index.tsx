import React from 'react';
import Style from './index.module.css';
import BridgeMon from '../../components/BridgeMon';

const APIPage: React.FC = () => {
    return (
        <div className={Style.apiContainer}>
            <div className={Style.bridgeMonContainer}>
                <BridgeMon></BridgeMon>
            </div>

            <div className={Style.apiMainContent}>
                <h1>API</h1>
                <p>
                    This service pulls data from the Seattle Department of Transportation.
                    Their API route specific to bridge openings can be found
                    here: <a href="https://web.seattle.gov/Travelers/api/Map/GetBridgeData">https://web.seattle.gov/Travelers/api/Map/GetBridgeData</a>
                </p>
                <p>
                    This API builds on top of the SDOT API by providing additional information
                    and more complete documentation in order to increase flexibility.
                </p>
                <p>
                    Requests to the <i>Is The Bridge Up</i> API seeks out bridge opening data
                    from transportation agencies no more frequently than once per minute.
                </p>

                <br />

                <h2>/get-bridges</h2>
                <p>Gets a list of all bridges in JSON with ONLY metadata</p>
                <p>Parameters</p>
                <ul>
                    <li>
                        <code>timetags</code><br />
                        Specify whether to append a four digit
                        time code to the end of the URL used for the
                        live still image (useful for forcing a browser
                        to refresh an image)<br />
                        Options: <code>True, False</code>
                    </li>
                </ul>
                <p>Response Data:</p>
                <ul>
                    <li>
                        <code>id (string)</code> - ID used for this bridge for this service
                    </li>
                    <li>
                        <code>name (string)</code> - Name of the bridge
                    </li>
                    <li>
                        <code>region (string)</code> - Area description for the bridge
                    </li>
                </ul>
                <p>
                    This route returns the above metadata as a list describing all bridges.
                </p>

                <br />

                <h2>/get-bridge-by-id</h2>
                <p>Returns all information, including up/down status of a bridge matching the given ID argument</p>
                <p>Parameters</p>
                <ul>
                    <li>
                        <code>id</code><br />
                        ID of the bridge to search for.
                    </li>
                    <li>
                        <code>timetags</code><br />
                        Specify whether to append a four digit
                        time code to the end of the URL used for the
                        live still image (useful for forcing a browser
                        to refresh an image)<br />
                        Options: <code>True, False</code>
                    </li>
                </ul>
                <p>Response Data:</p>
                <ul>
                    <li>
                        <code>LastUpdate (int)</code> - Time of last refresh from transportation agencies in milliseconds
                    </li>
                    <li>
                        <code>id (string)</code> - ID used for this bridge for this service
                    </li>
                    <li>
                        <code>name (string)</code> - Name of the bridge
                    </li>
                    <li>
                        <code>region (string)</code> - Area description for the bridge
                    </li>
                    <li>
                        <code>latitude (float)</code> - Latitude coordinates
                    </li>
                    <li>
                        <code>longitude (float)</code> - Longitude coordinates
                    </li>
                    <li>
                        <code>staticimg (string)</code> - URL of a static photograph of the bridge for descriptive purposes
                    </li>
                    <li>
                        <code>liveimg (string)</code> - URL of a frequently updated still frame from one of the regional transporation agencies
                    </li>
                    <li>
                        <code>status (string)</code> - Either "Up" or "Down", describes the current status of the bridge
                    </li>
                </ul>

                <br />

                <h2>/get-all-bridge-data</h2>
                <p>Returns complete data for all bridges.</p>
                <p>Parameters</p>
                <ul>
                    <li>
                        <code>timetags</code><br />
                        Specify whether to append a four digit
                        time code to the end of the URL used for the
                        live still image (useful for forcing a browser
                        to refresh an image)<br />
                        Options: <code>True, False</code>
                    </li>
                </ul>
                <p>
                    Response Data: exact same as get-bridge-by-id, except in a list of all bridges.
                </p>
            </div>
        </div>
    );
}

export default APIPage;
