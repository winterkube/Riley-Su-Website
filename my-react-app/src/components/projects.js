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
        { img: howtomath,   title: 'How To Math (demo)', /* ... */ link: '…' },
        { img: ubcrapid,    title: 'UBC Rapid',            /* ... */ link: '…' },
        { img: hirehigher,  title: 'HireHigher',           /* ... */ link: '…' },
        { img: log_logo,    title: 'LOG Website',          /* ... */ link: '…' },
        { img: stormhacks,  title: 'ChessAI',              /* ... */ link: '…' },
        { img: quackii,     title: 'Quackii',              /* ... */ link: '…' },
        { img: risc,        title: 'RISC Simulator',       /* ... */ link: '…' },
    ];

    const VISIBLE = 3;               // how many cards you see
    const ITEM_W = 250;              // width of one card
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
    const prev = () => {
        setIndex((i) => i - 1);
    };
    // move right
    const next = () => {


        setIndex((i) => i + 1);
    };

    // whenever `index` changes, slide and enable transition
    useEffect(() => {
        const track = trackRef.current;
        if (index !== 0 && index !== projects.length + VISIBLE) {
            track.style.transition = 'transform 0.5s ease';
            track.style.transform = `translateX(-${index * SLIDE_W}px)`;
        } else if (index === projects.length + VISIBLE) {
            track.style.transition = 'transform 0.0s ease';
            track.style.transform = `translateX(-${index * SLIDE_W}px)`;
            setIndex(VISIBLE );
        } else {
            track.style.transition = 'transform 0.0s ease';
            track.style.transform = `translateX(-${index * SLIDE_W}px)`;
            setIndex(VISIBLE );
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
