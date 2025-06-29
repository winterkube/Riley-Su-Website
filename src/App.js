
import React, {useLayoutEffect, useRef, useState} from 'react';
import WindowFrame from './components/WindowFrame';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import About from './components/home';
import Experience from './components/exp';
import Projects from './components/projects';
import Misc from './components/misc';
import Contact from './components/contact';

import './App.css';  // for the .app-container and .menu-styles


export default function App() {
    const [view, setView] = useState('menu');
    const [angle, setAngle] = useState(0);

    const containerRef = useRef();
    const [scale, setScale] = useState(1);

    // Base design dimensions
    const BASE_W = 1080;
    const BASE_H = 530;

    useLayoutEffect(() => {
        function updateScale() {
            const cw = containerRef.current.clientWidth;
            const ch = containerRef.current.clientHeight;
            // We want the window to occupy 90% of available width/height
            const targetW = cw * 0.5;
            const targetH = ch * 0.5;
            // Find the largest uniform scale that fits both dimensions
            const s = Math.min(targetW / BASE_W, targetH / BASE_H);
            setScale(s);
        }

        updateScale();
        window.addEventListener('resize', updateScale);
        return () => window.removeEventListener('resize', updateScale);
    }, []);

    // const rotateDown = () => {
    //     setAngle(prev => prev - 90);
    // };
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
                {/*
        We use transform: scale(...) so everything inside (px fonts, borders, canvas)
        scales up/down uniformly.
      */}
                <div
                    className="scaler"
                    style={{
                        width: BASE_W,
                        height: BASE_H,
                        transform: `scale(${scale})`,
                        transformOrigin: 'center',
                    }}
                >

                    <div className="window-container" >
            <WindowFrame title="RileySu.exe">
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