// src/components/Home.js
import React from 'react';
import './home.css';

function Home({ goBack }) {
    return (
        <div className="home">

            <h1>ABOUT</h1>
            <p3> </p3>

            <p>Currently a third year student studying Computer Engineering at the University of British Columbia.
                <br></br>
                <br></br>
                Creative mind with a passion for design, teamwork, and rigorous problem solving.

            </p>

            <div className="photo">
                <div className="image"></div>
                <br></br>
                NAME: RILEY SU <br></br>
                BORN: 2004 <br></br>
                SPECIES: HUMAN <br></br>
                {/*IP: 192.294.457.22 <br></br>*/}

            </div>
            {/*<p2> okay, probably not. But I'll strive to do the best I can.</p2>*/}

            <div className="resume">
                RESUME
            </div>

            <button className="back-button" onClick={goBack}>
                ← Back
            </button>
        </div>
    );
}

export default Home;
