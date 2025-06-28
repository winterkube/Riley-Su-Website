// src/components/WindowFrame.jsx
import React, {useState} from 'react';
import './flower.css';
import Petals from "./petals";




export default function Flower() {



    return (
        <div className="flowerss">
            <div className="petals1">
                <Petals></Petals>
            </div>
            {/*<div className="petals2">*/}
            {/*    <Petals></Petals>*/}
            {/*</div>*/}


        </div>
    );
}
