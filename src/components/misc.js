import React from "react";
import './misc.css';

function Misc({goBack}) {
    return (
        <div className="misc">

            <h1> MISC </h1>
            <div className="slides"> Some cool slideshow designs I made:</div>

            <div className="vids"> Some cool animations I made:</div>

            <div className="buns"> Some cute bunny videos I took:</div>

            <div className="music"> ...And some cool music I made, available on my newgrounds:</div>

            <button className="back-button" onClick={goBack}>
                ← Back
            </button>

        </div>
    );
}

export default Misc;

