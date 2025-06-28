
import React, {useState} from 'react';
import './particles.scss';

export default function Particles() {

    const items = [];

    for (let i = 0; i < 75; i++) {
        items.push(<div className="circle-container" key={i}>
            <div className="circle"></div></div>);
    }

    return (
        <>

            <div className="container">
                {items}
            </div>

        </>

    )
}