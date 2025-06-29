
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import WindowFrame from './components/WindowFrame';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import About from './components/home';
import Experience from './components/exp';
import Projects from './components/projects';
import Misc from './components/misc';
import Contact from './components/contact';

import './App.css';  // for the .app-container and .menu-styles


export default function App() {

    const [isMobile, setIsMobile] = useState(false);

    // on mount, sniff the userAgent for a mobile device
    useEffect(() => {
        const ua = navigator.userAgent || navigator.vendor || window.opera;
        if (/Mobi|Android|iPhone|iPad|iPod/i.test(ua)) {
            setIsMobile(true);
        }
    }, []);

    const [view, setView] = useState('menu');
    const [angle, setAngle] = useState(0);

    const containerRef = useRef();


    const [ratio, setRatio] = useState(0.85);     // default 0.8
    const MIN_RATIO = 0.3, MAX_RATIO = 0.9;
    const handleMaximize = () => setRatio(MAX_RATIO);
    

    // Compute the dynamic scale factor each render
    const [scale, setScale] = useState(1);
    useLayoutEffect(() => {
        const cw = containerRef.current.clientWidth;
        const ch = containerRef.current.clientHeight;
        const targetW = cw * ratio;
        const targetH = ch * ratio;
        const BASE_W = 1080, BASE_H = 530;
        const s = Math.min(targetW/BASE_W, targetH/BASE_H);
        setScale(s);
    }, [ratio]);


    const isDragging = useRef(false);
    const startPos   = useRef(0);
    const startRatio = useRef(ratio);
    const axisRef    = useRef('x');   // 'x' or 'y'
    const signRef    = useRef(1);     // +1 or -1

    // global mousemove/up for resizing
    useLayoutEffect(() => {
        const onMouseMove = (e) => {
            if (!isDragging.current) return;
            const cw = containerRef.current.clientWidth;
            const ch = containerRef.current.clientHeight;
            // how far we've moved along the active axis
            const delta = axisRef.current === 'x'
                ? e.clientX - startPos.current
                : e.clientY - startPos.current;
            // apply sign and normalize by container dimension
            let newRatio = startRatio.current +
                signRef.current * (delta / (axisRef.current === 'x' ? cw : ch));
            newRatio = Math.max(MIN_RATIO, Math.min(MAX_RATIO, newRatio));
            setRatio(newRatio);
        };
        const onMouseUp = () => {
            isDragging.current = false;
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup',   onMouseUp);
        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup',   onMouseUp);
        };
    }, []);

    // start dragging: figure out axis & sign from data-attrs
    const startResize = (e) => {
        axisRef.current = e.currentTarget.dataset.axis; // 'x' or 'y'
        signRef.current = parseFloat(e.currentTarget.dataset.sign); // +1 or -1
        startPos.current = axisRef.current === 'x' ? e.clientX : e.clientY;
        startRatio.current = ratio;
        isDragging.current = true;
        e.preventDefault();
    };

    // The “main menu”
    const Menu = ({ goTo }) => (
        <div className="menu-screen">
            <h1 className="menu-title">Riley Su</h1>


            <div className='cube'>
                <div className="desc"
                     // className="cube_items"
                     style={{
                         transform: `translateZ(-200px) rotateX(${angle}deg)`,
                         transformStyle: "preserve-3d",
                         transition: "transform 1s ease"
                     }}>
                    {/*<h2 className="title-desc1">*/}
                    {/*Software Engineer </h2> <h2 className="title-desc2">*/}
                    {/*Website Developer</h2> <h2 className="title-desc3">*/}
                    {/*UI/UX/Graphics Designer</h2> <h2 className="title-desc4">*/}
                    {/*Calculus Tutor</h2> <h2 className="title-desc5">*/}
                    {/*Music Producer</h2>*/}
                    <ul
                    >

                        {/* media src in react js link from within src or using /public as root */}
                        <div className="cube__face face1">
                            Website Developer
                        </div>
                        <div className="cube__face face2">
                            UI/UX/Graphics Designer
                        </div>
                        <div className="cube__face face3">
                            Calculus Tutor
                        </div>
                        <div className="cube__face face4">
                            Music Producer
                        </div>

                        <div className="cube__face face5">
                            Software Engineer
                        </div>
                    </ul>
                </div>

            </div>

            <div className="menu-buttons">
                {['about', 'projects', 'experience', 'misc', 'contact'].map((section) => (
                    <button key={section} onClick={() => goTo(section)}>
                        {section.charAt(0).toUpperCase() + section.slice(1)}
                    </button>
                ))}
            </div>
        </div>
        )
    ;

    // Map view names to components, passing down goBack / goTo
    const views = {
        menu: <Menu goTo={setView}/>,
        about: <About goBack={() => setView('menu')}/>,
        experience: <Experience scale={scale} goBack={() => setView('menu')}/>,
        projects: <Projects goBack={() => setView('menu')}/>,
        misc: <Misc goBack={() => setView('menu')}/>,
        contact: <Contact goBack={() => setView('menu')}/>,
    };

    return (
        // <div className="app-container">


        <div ref={containerRef} className="app-outer">
            <div className="app-bg1"></div>
            {/*<div className="app-bg2"></div>*/}

            {isMobile && (
                <div className="mobile-warning">
                    ⚠️ ME NOT MOBILE SUPPORTED YET!!
                </div>
            )}


            {/*
        We use transform: scale(...) so everything inside (px fonts, borders, canvas)
        scales up/down uniformly.
      */}
            <div
                className="scaler"
                style={{
                    width: 1080,
                    height: 530,
                    transform: `scale(${scale})`,
                    transformOrigin: 'center',
                    position: 'relative'
                }}
            >
                <div
                    className="resizer left"
                    data-axis="x"
                    data-sign="-1"
                    onMouseDown={startResize}
                />
                <div
                    className="resizer right"
                    data-axis="x"
                    data-sign="1"
                    onMouseDown={startResize}
                />
                <div
                    className="resizer top"
                    data-axis="y"
                    data-sign="-1"
                    onMouseDown={startResize}
                />
                <div
                    className="resizer bottom"
                    data-axis="y"
                    data-sign="1"
                    onMouseDown={startResize}
                />
                <div className="window-container">


                    <WindowFrame title="RileySu.exe" onMaximize={handleMaximize}>
                        <TransitionGroup component={null}>
                            <CSSTransition
                                key={view}
                                timeout={300}
                                classNames="screen"
                            >
                                {/*
              We need a single DOM node to attach the transition classes to,
              so wrap the dynamic view in a div.screen-wrapper
            */}
                                <div className="screen-wrapper">
                                    {views[view]}
                                </div>
                            </CSSTransition>
                        </TransitionGroup>
                    </WindowFrame>
                </div>
            </div>
        </div>
        // </div>
    );
}