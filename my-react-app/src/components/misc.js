import React from "react";
import './misc.css';

function Misc({goBack}) {
    return (
        <div className="misc">

            <h2> MISC </h2>
            <p> I am also passionate in graphic design and have worked on several visual projects throughout the years.
                Check them out:</p>

            <p> Additionally, I produce electronic music in my spare time as a hobby. You can see my works on my
                newgrounds page:</p>

            <button className="back-button" onClick={goBack}>
                ← Back
            </button>

        </div>
    );
}

export default Misc;

