// src/components/WindowFrame.jsx
import React, {useState} from 'react';
import './WindowFrame.css';




export default function WindowFrame({ title = 'RileySu.exe', children }) {

    const [mouse, setMouse] = useState({ x: 0, y: 0 });
    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMouse({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    return (
        <div className="fake-window">
            <div className="titlebar">
                <span className="title-text">{title}</span>
                <div className="title-buttons">

                    <span className="btn minimize">━</span>
                    <span className="btn maximize">🗖</span>
                    <span className="btn close">✖</span>

                </div>
            </div>


            <div className="window-content"
                 onMouseMove={handleMouseMove}>
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
                <div className="inner-content">
                    {children}
                </div>

            </div>
        </div>
    );
}
