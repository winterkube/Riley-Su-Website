import React, { useState, useRef, useEffect } from 'react';
import ubcrapid from './images/ubcrapid.png';
import log_logo from './images/log logo.png';
import howtomath from './images/howtomath.png';
import hirehigher from './images/hirehigher.png';
import stormhacks from './images/stormhacks.png';
import quackii from './images/quackii.png';
import risc from './images/risc.png';
import './projects.css';

export default function Projects({ goBack }) {
    const projects = [
        {
            img: howtomath,
            title: 'How To Math (demo)',
            description:
                'This is a rhythm-game style math game I made from scratch in pure React/JS. It may end up as the hardest math game ever conceived.',
            link: 'https://winterkube.github.io/LOG/games/howtomath',
        },
        {
            img: ubcrapid,
            title: 'UBC Rapid',
            description:
                'I am part of the UBC Rapid Design team, where I work on the web-dev subteam.',
            link: 'https://ubc-rapid.com/#/',
        },
        {
            img: hirehigher,
            title: 'HireHigher: LangaraHacks Winner',
            description:
                "Our group’s AI-based job interview simulator won LangaraHacks 2024!",
            link: 'https://github.com/Jordan-SFU/HireHigher',
        },
        {
            img: log_logo,
            title: 'LOG Website',
            description:
                'Leading a passion project for a free online gaming site—currently WIP.',
            link: 'https://winterkube.github.io/LOG/',
        },
        {
            img: stormhacks,
            title: 'ChessAI: StormHacks 2024',
            description:
                'Built a chess game with AI-generated pieces in StormHacks 2024 hackathon.',
            link: 'https://github.com/Jordan-SFU/ChessAI',
        },
        {
            img: quackii,
            title: 'Quackii: nwHacks 2024',
            description:
                'An AI-powered rubber duck that walks across the screen—nwHacks 2024.',
            link: 'https://github.com/pnotato/Quackii',
        },
        {
            img: risc,
            title: 'RISC Machine Simulator',
            description:
                'Simulated a RISC CPU in Verilog and Quartus on a DE1-SoC for CPEN211.',
            link: 'https://github.com/ubc-cpen211/lab-7-l1e-winterkube',
        },
    ];

    const VISIBLE = 3;               // how many cards you see
    const ITEM_W = 240;              // width of one card
    const GAP = 38;                  // gap between cards
    const SLIDE_W = ITEM_W + GAP;    // how far we move each time

    // 1) build an “extended” list with clones at both ends
    const extended = [
        ...projects.slice(-VISIBLE),
        ...projects,
        ...projects.slice(0, VISIBLE),
    ];

    // 2) index points into `extended`; start at the first real slide
    const [index, setIndex] = useState(VISIBLE);
    const trackRef = useRef(null);

    // move left

    // move right
    const [asd, setAsd] = useState(true);
    const [justTped, setJustTped] = useState(false);
    const prev = () => {
        if (index < projects.length + VISIBLE && asd)
        {
            setIndex((i) => i - 1);
            setAsd(false);
            setTimeout(() =>{
                setAsd(true);
            }, 250);
        }
    };
    const next = () => {


        if (index < projects.length + VISIBLE && asd)
        {
            setIndex((i) => i + 1);
            setAsd(false);
            setTimeout(() =>{
                setAsd(true);
            }, 250);
        }

    };


    // whenever `index` changes, slide and enable transition
    useEffect(() => {
        const track = trackRef.current;
        if (index > 0 && index < VISIBLE + projects.length && index !== VISIBLE && index !== projects.length) {
            track.style.transition = 'transform 0.25s ease';
            track.style.transform = `translateX(-${index * SLIDE_W}px)`;
            setJustTped(false);
        } else if (index === projects.length + VISIBLE) {
            track.style.transition = 'transform 0.25s ease';
            track.style.transform = `translateX(-${index * SLIDE_W}px)`;
            setTimeout(() => {
                track.style.transition = 'none';
                track.style.transform = `translateX(-${index * SLIDE_W}px)`;

                setIndex(VISIBLE);
                setJustTped(true);

            }, 250);
        }else if (index === 0){
            track.style.transition = 'transform 0.25s ease';
            track.style.transform = `translateX(-${index * SLIDE_W}px)`;
            setTimeout(() => {
                track.style.transition = 'none';
                track.style.transform = `translateX(-${index * SLIDE_W}px)`;

                setIndex(projects.length);
                setJustTped(true);

            }, 250);
        } else {
            if (!justTped) {
                track.style.transition = 'transform 0.25s ease';
                track.style.transform = `translateX(-${index * SLIDE_W}px)`;

            } else {
                track.style.transition = 'none';
                track.style.transform = `translateX(-${index * SLIDE_W}px)`;
                setJustTped(false);
            }

            //
            // setTimeout(() => {
            //     track.style.transition = 'none';
            //     track.style.transform = `translateX(-${index * SLIDE_W}px)`;
            //
            //     // setIndex(VISIBLE );
            //
            // }, 500);
        }

    }, [index]);

    // when the transition ends, “jump” without animation if we hit a clone
    const onTransitionEnd = () => {
        // const track = trackRef.current;
        // // if moved past the real last slide...
        // if (index >= projects.length + VISIBLE) {
        //     track.style.transition = 'transform 0.0s ease';
        //     track.style.transform = `translateX(-${index * SLIDE_W}px)`
        //     setIndex(VISIBLE);
        // }
        // // if moved before the real first slide...
        // else if (index < VISIBLE) {
        //     track.style.transition = 'transform 0.0s ease';
        //     track.style.transform = `translateX(-${index * SLIDE_W}px)`
        //     setIndex(projects.length + VISIBLE - 1);
        // }
    };

    return (
        <div className="projects-carousel">
            <button className="carousel-btn left" onClick={prev}>‹</button>

            <div
                className="carousel-window"
                style={{
                    width: VISIBLE * ITEM_W + (VISIBLE) * GAP + 'px',
                }}
            >
                <div
                    className="carousel-track"
                    ref={trackRef}
                    onTransitionEnd={onTransitionEnd}
                    style={{
                        width:
                            extended.length * ITEM_W +
                            (extended.length - 1) * GAP +
                            'px',
                    }}
                >
                    {extended.map((p, i) => (
                        <a
                            key={i}
                            href={p.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-card"
                        >
                            <img src={p.img} alt={p.title} />
                            <div className="project-info">
                                <h3>{p.title}</h3>
                                <p>{p.description}</p>
                            </div>
                        </a>
                    ))}
                </div>
            </div>

            <button className="carousel-btn right" onClick={next}>›</button>

            <button className="back-button" onClick={goBack}>← Back</button>
        </div>
    );
}
