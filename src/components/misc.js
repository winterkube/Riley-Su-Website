import React, {useEffect, useRef, useState} from "react";
import './misc.css';

import m7e from './images/M7 e poster.png';
import m7rwh from './images/M7 RWH E-Poster (5).png';
import simpsons from './images/simpsons (69).png';
import bike from './images/Road Safety Slideshow.png';
import internet from './images/internet.png';

import ceo from './videos/CEO anim.mp4';
import aliens from './videos/aliens.mp4';
import alg from './videos/algebraTrialVid.mp4';
import enk from './videos/enkindleshort.mp4';
import grass from './videos/grass.mp4';
import fizzle from './videos/fizzle.mp4';

import bun1 from './videos/bun1.mov';
import bun2 from './videos/bun2.mov';
import bun3 from './videos/bun3.mov';
import bun4 from './videos/bun4.mov';
import bun5 from './videos/bun5.mov';

import newgrounds from './images/newgrounds.png'

function Misc({goBack}) {

    const images1 = [
        { src: m7e, link: 'https://example.com/1' },
        { src: m7rwh, link: 'https://example.com/2' },
        { src: simpsons, link: 'https://docs.google.com/presentation/d/1xtZpYNTTBg2gxCmCZUbA-KIdmH3DUm8CH49cx46i1zE/edit?usp=sharing' },
        { src: bike, link: 'https://docs.google.com/presentation/d/12poH5533DC7BsIOKQ775GCFax9DBEdUxVFmA_Me1bUM/edit?usp=sharing' },
        { src: internet, link: 'https://docs.google.com/presentation/d/10BCLqgXOpSlka-6kCe9X4TzZFD-IxRVaXJg22SRllBE/edit?usp=sharing' },
        // …etc
    ];
    const videos1 = [
        { src: ceo },
        { src: aliens},
        { src: alg },
        { src: enk},
        { src: grass},
        { src: fizzle},
        // …etc
    ];
    const videos2 = [
        { src: bun1 },
        { src: bun2 },
        { src: bun3 },
        { src: bun4 },
        { src: bun5 },
        // …etc
    ];

    // Three separate indices
    const [i1, setI1] = useState(0);
    const [i2, setI2] = useState(0);
    const [i3, setI3] = useState(0);

    const prev = (idx, setIdx, arr) =>
        setIdx((idx - 1 + arr.length) % arr.length);
    const next = (idx, setIdx, arr) => setIdx((idx + 1) % arr.length);




    const onChange = () => {

    }


    return (
        <div className="misc">

            <h1> MISC </h1>
            <div className="slides"> Some cool slideshow designs I made:

                <div className="mini-carousel">
                    <button onClick={() => prev(i1, setI1, images1)} className="arrow">
                        ‹
                    </button>
                    <a
                        href={images1[i1].link}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img src={images1[i1].src} alt="" className="carousel-img"/>
                    </a>
                    <button onClick={() => next(i1, setI1, images1)} className="arrow">
                        ›
                    </button>
                </div>

            </div>

            <div className="vids"> Some cool animations I made:

            <div className="mini-carousel">
                <button onClick={() => prev(i2, setI2, videos1)} className="arrow">
                    ‹
                </button>

                <video
                    src={videos1[i2].src}
                    className="carousel-video"
                    // controls
                    autoPlay={true}
                    loop
                    muted
                />

                <button onClick={() => next(i2, setI2, videos1)} className="arrow">
                    ›
                </button>
            </div>

            </div>
            <div className="buns"> Some cute bunny videos I took:

                <div className="mini-carousel">
                    <button onClick={() => prev(i3, setI3, videos2)} className="arrow">
                        ‹
                    </button>

                        <video
                            src={videos2[i3].src}
                            className="carousel-video"
                            controls
                            autoPlay={true}
                            loop
                            muted
                        />

                    <button onClick={() => next(i3, setI3, videos2)} className="arrow">
                        ›
                    </button>
                </div>

            </div>

            <div className="music"> ...And some cool music I made, available on newgrounds:


                <a href="https://winterkube.newgrounds.com/"
                   target="_blank"
                   rel="noopener noreferrer">

                    <img src={newgrounds} alt="" className="carousel-img"/>

                </a>

            </div>

            <button className="back-button" onClick={goBack}>
                ← Back
            </button>

        </div>
    );
}

export default Misc;

