import React, {useEffect, useRef, useState} from "react";
import './misc.css';

import m7e from './images/M7 e poster.png';
import m7rwh from './images/M7 RWH E-Poster (5).png';
import simpsons from './images/simpsons (69).png';
import bike from './images/Road Safety Slideshow.png';
import internet from './images/internet.png';

import { Carousel } from 'nuka-carousel';

function Misc({goBack}) {

    const slides = [
        {
            img: m7e,
            link: 'https://winterkube.github.io/LOG/games/howtomath',
        },
        {
            img: m7rwh,
            link: 'https://winterkube.github.io/LOG/games/howtomath',
        },
        {
            img: simpsons,
            link: 'https://winterkube.github.io/LOG/games/howtomath',
        },
        {
            img: bike,
            link: 'https://winterkube.github.io/LOG/games/howtomath',
        },
        {
            img: internet,
            link: 'https://winterkube.github.io/LOG/games/howtomath',
        },
    ]




    const onChange = () => {

    }


    return (
        <div className="misc">

            <h1> MISC </h1>
            <div className="slides"> Some cool slideshow designs I made:

                <Carousel className="carousel"
                          scrollDistance="screen"
                        showArrows="always"
                          autoplay={true} autoplayInterval={1000} wrapMode="wrap"
                    // onClickItem={onClickItem}
                    // onClickThumb={onClickThumb}
                >
                    <div>
                        <img src={m7e} />
                        <p className="legend">Legend 1</p>
                    </div>
                    <div>
                        <img src={m7rwh} />
                        <p className="legend">Legend 2</p>
                    </div>
                    <div>
                        <img src={simpsons} />
                        <p className="legend">Legend 3</p>
                    </div>
                    <div>
                        <img src={bike} />
                        <p className="legend">Legend 4</p>
                    </div>
                    <div>
                        <img src={internet} />
                        <p className="legend">Legend 5</p>
                    </div>
                </Carousel>

            </div>

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

