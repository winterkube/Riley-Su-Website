// src/components/WindowFrame.jsx
import React, {useRef, useState} from 'react';
import './WindowFrame.css';
import Flower from './flower';
import Particles from "./particles";



export default function WindowFrame({ title = 'RileySu.exe', children }) {



    const [ripples, setRipples] = useState([]);
    const contentRef = useRef(null);

    // Remove a ripple by its id
    const removeRipple = (id) =>
        setRipples((r) => r.filter((ripple) => ripple.id !== id));

    // On click inside the window-content, spawn a new ripple
    const handleMouseDown = (e) => {
        const el   = contentRef.current;
        const rect = el.getBoundingClientRect();

          const scaleX = rect.width  / el.offsetWidth;
           const scaleY = rect.height / el.offsetHeight;

        const rawX = e.clientX - rect.left;
        const rawY = e.clientY - rect.top;

        const id = Date.now() + Math.random();
        setRipples((r) => [
                 ...r,
                 { id, x2: rawX / scaleX, y2: rawY / scaleY }
               ]);
    };
    const [mouse, setMouse] = useState({ x: 0, y: 0 });
    const handleMouseMove = (e) => {
        const el   = contentRef.current;
        const rect = el.getBoundingClientRect();

           // true scale = (width after transform) / (original width before transform)
        const scaleX = rect.width  / el.offsetWidth;
        const scaleY = rect.height / el.offsetHeight;
        // raw mouse pos relative to top-left of element in screen px
           const rawX = e.clientX - rect.left;
           const rawY = e.clientY - rect.top;

           // divide by scale to get internal (unscaled) coords
               setMouse({
                   x: rawX / scaleX,
                 y: rawY / scaleY,
               });
    };

    const [minimized, setMinimized] = useState(false);

    const [maximized, setMaximized] = useState(false);
    const [closed, setClosed] = useState(false);

    const minimize = () => {
        setMinimized(true);
        setMaximized(false);
    }
    const maximize = () => {
        setMaximized(true);
        setMinimized(false);

    }
    const close = () => {
        if (window.confirm("You sure?")) {
            setClosed(true);
        }

    }

    return (
        <div className={`fake-window ${minimized ? 'mini' : ''} ${maximized ? 'maxi' : ''} ${closed ? 'close' : ''}`}>
            <div className={`titlebar ${minimized ? 'mini' : ''} ${maximized ? 'maxi' : ''}` }>
                <span className="title-text">{title}</span>
                <div className="title-buttons">

                    <span className="btn minimize" onClick={minimize}>━</span>
                    <span className="btn maximize" onClick={maximize}>🗖</span>
                    <span className="btn close" onClick={close}>✖</span>

                </div>
            </div>


            <div className={`window-content ${minimized ? 'mini' : ''} ${maximized ? 'maxi' : ''}`}
                 onMouseMove={handleMouseMove}
                 ref={contentRef}
                 onMouseDown={handleMouseDown}>
                <div
                    className="mouse-circle"
                    style={{
                        left: mouse.x + 'px',
                        top: mouse.y + 'px',
                    }}
                />
                <div className="bg">

                    <div className="hexs">
                        <div className="hexagon"></div>
                        <div className="hexagon"></div>
                        <div className="hexagon"></div>
                    </div>

                    <div className="hexs2">

                        <div className="hexagon2"></div>
                        <div className="hexagon2"></div>
                        <div className="hexagon2"></div>
                    </div>

                    <div className="hexs3">

                        <div className="hexagon2"></div>
                        <div className="hexagon2"></div>
                        <div className="hexagon2"></div>
                    </div>

                    <div className="hexs4">

                        <div className="hexagon2"></div>
                        <div className="hexagon2"></div>
                        <div className="hexagon2"></div>
                    </div>

                    <div className="hexs5">

                        <div className="hexagon2"></div>
                        <div className="hexagon2"></div>
                        <div className="hexagon2"></div>
                    </div>

                    <div className="hexs6">

                        <div className="hexagon2"></div>
                        <div className="hexagon2"></div>
                        <div className="hexagon2"></div>
                    </div>

                    <div className="hexs7">

                        <div className="hexagon2"></div>
                        <div className="hexagon2"></div>
                        <div className="hexagon2"></div>
                    </div>


                </div>

                <div className="flower-container2">
                {/* Ripples */}
                {ripples.map(({ id, x2, y2 }) => (
                    <span
                        key={id}
                        className="ripple"
                        style={{left: x2, top: y2}}
                        onAnimationEnd={() => removeRipple(id)}
                    ><div className="flower-container">
                    <div className="flower-bg">
                        <Flower></Flower>
                    </div>
                    <div className="flower-bg2">
                        <Flower></Flower>
                    </div>
                </div></span>
                ))}
                </div>


                <Particles></Particles>

                <div className="inner-content">
                    {children}
                </div>

            </div>
        </div>
    );
}
