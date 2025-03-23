import React from 'react';
import Style from './index.module.css';
import BridgeMon from '../../components/BridgeMon';

const About: React.FC= () => {

    /* ***Main page content*** */
    return (
        <div className={Style.aboutContainer}>
            <div className={Style.bridgeMonContainer}>
                <BridgeMon></BridgeMon>
            </div>
            
            <div className={Style.aboutMainContent}>
                <h1>About</h1>
                <h2>What is <i>Is The Bridge Up?</i></h2>
                <p>
                    <i>Is The Bridge Up</i> is a full stack web development project designed
                    around a simple goal - show whether Seattle's 7 moveable bridges
                    are currently up or down. Surrounded by several rivers and waterways,
                    the City of Seattle has 3 moveable bridges spanning the Duwamish River (1st Ave S/SR99,
                    Lower Spokane Street/Lower West Seattle Bridge, and the South Park Bridge),
                    and 4 moveable bridges spanning the Lake Washington Ship Canal
                    (Ballard, Fremont, University and Montlake bridges). These bridges carry motor vehicle,
                    bike and pedestrian traffic above and open for boat traffic below.
                </p>
                <p>
                    If you drive across these bridges often, it's not uncommon to get
                    stuck at one of them when they open for boat traffic. It's happened to me
                    more than once driving up Highway 509, eventually inspiring me to create
                    this site as a project to show the status of all the moveable bridges throughout
                    the city on one screen. My first thought was to make a mobile app, but I'm not well versed
                    in mobile development. With a background in web development, I though I'd start out by making
                    a backend API (which I could develop an app off of later) and a frontend website
                    to showcase the API with live pictures from traffic cameras.
                </p>
                <p>
                    The data for this site mainly comes from the Seattle Department of Transportation,
                    which already has an interactive map where you can toggle traffic cameras and 
                    bridge status indicators. That site is a more of a general traffic map with cameras
                    and alerts. This project takes their API and focuses on the city's bridges,
                    complete with live pictures and a more clearly documented API.
                </p>
                <h2>Tech Stack</h2>
                <p>
                    This site uses Node.JS and Express on the backend API, written in JavaScript.
                    On the frontend, React with TypeScript is used. Bridge metadata is stored in
                    a PostgreSQL database.
                </p>
                <h2>About the Developer</h2>
                <p>
                    I'm Preston Sia, an undergraduate student studying Computer Science at
                    the <a href="https://www.tacoma.uw.edu/set">
                        University of Washington Tacoma School of Engineering and Technology.
                        </a>.
                    When I'm not studying for my classes or working, I often do front end development
                    as one of the club officers for
                    the <a href="https://techstartupclub.netlify.app/about">Tech Startup Club</a>,
                    a student-run club focused on full stack web development. Although this is not
                    a club project, I thank the team for their insights and expertise on many of our
                    club projects that helped prepare me with the frontend and backend expertise needed
                    to develop this site.
                </p>
                <p>You can contact me at <a href="mailto:pre.sia977@outlook.com">pre.sia977@outlook.com</a></p>
            </div>
        </div>
    );
}

export default About;
