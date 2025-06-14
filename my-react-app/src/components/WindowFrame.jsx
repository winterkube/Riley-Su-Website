// src/components/WindowFrame.jsx
import React from 'react';
import './WindowFrame.css';

export default function WindowFrame({ title = 'RileySu.exe', children }) {
    return (
        <div className="fake-window">
            <div className="titlebar">
                <span className="title-text">{title}</span>
                <div className="title-buttons">
                    <span className="btn-circle close"></span>
                    <span className="btn-circle minimize"></span>
                    <span className="btn-circle maximize"></span>
                </div>
            </div>
            <div className="window-content">
                {children}
            </div>
        </div>
    );
}
