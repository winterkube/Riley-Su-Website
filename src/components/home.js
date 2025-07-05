// src/components/Home.js
import React, {useState} from 'react';
import './home.css';
import pdf from "../Riley Su Resume.pdf"



function Home({ goBack }) {
    const [resumeOpen, setResumeOpen ] = useState(false);
    const openResume = () => {
        setResumeOpen(true);
    }
    return (
        <>
            <div className={`home ${resumeOpen ? 'open' : ''} `}>

                <h1>ABOUT</h1>
                <p3></p3>

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

                <div className="resume-button" onClick={openResume}>
                    RESUME
                    {/*<a href={pdf} download="Riley Su Resume.pdf">RESUME</a>*/}
                </div>

                <button className="back-button" onClick={goBack} disabled={resumeOpen}>
                    ← Back
                </button>
            </div>
            <div className="home2">
                <div className={`blackbox ${resumeOpen ? 'open' : ''} `}> </div>
                <div className={`resume ${resumeOpen ? 'open' : ''} `}>


                    <button className="exit" onClick={() => {
                        setResumeOpen(false)
                    }}>
                        X
                    </button>
                    <a href={pdf} download="Riley Su Resume.pdf">Download</a>
                </div>
            </div>

        </>
    );
}

export default Home;
