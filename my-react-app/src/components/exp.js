import './exp.css';
import React, {useEffect, useRef} from 'react';
import {useState} from "react";
import htmlLogo from './images/htmllogo.png';
import c from './images/c.png';
import cpp from './images/cpp.png';
import css from './images/css.png';
import git from './images/git.png';
import java from './images/java.png';
import javascript from './images/JavaScript.png';
import matlab from './images/matlab.png';
import mysql from './images/mysql.png';
import python from './images/python.png';
import react from './images/react.png';
import systemverilog from './images/systemverilog.png';

import ubcrapid from './images/ubcrapid.png';
import log_logo from './images/log logo.png';


const Exp = ({ goBack }) => {
        const skills = [
                {img: htmlLogo, title: 'HTML'},
                {img: css, title: 'CSS'},
                {img: javascript, title: 'Java Script'},
                {img: react, title: 'React'},
                {img: java, title: 'Java'},
                {img: python, title: 'Python'},
                {img: c, title: 'C'},
                {img: cpp, title: 'C++'},
                {img: systemverilog, title: 'System Verilog'},
                {img: git, title: 'Git'},
                {img: matlab, title: 'Matlab'},
                {img: mysql, title: 'MySQL'}
        ];
    const [index, setIndex] = useState(0);
    const visibleSkills = 8;
    const trackRef = useRef(null);

    const handlePrevClick = () => {
        if (index === 0) {
            trackRef.current.style.transition = 'transform 0.5s ease-in-out';
            setIndex(skills.length - 1);
            setTimeout(() => {
                trackRef.current.style.transition = 'transform 0.5s ease-in-out';
                setIndex(skills.length - 1);
            }, 20);
        } else {
            setIndex((prevIndex) => prevIndex - 1);
        }
    };

    const handleNextClick = () => {
        if (index === skills.length - 1) {
            trackRef.current.style.transition = 'transform 0.5s ease-in-out';
            setIndex(index + 1);
            setTimeout(() => {
                trackRef.current.style.transition = 'transform 0.5s ease-in-out';
                setIndex(0);
            }, 500);
        } else {
            setIndex((prevIndex) => prevIndex + 1);
        }
    };



    useEffect(() => {
        trackRef.current.style.transition = 'transform 0.5s ease-in-out';
    }, [index]);

    const getVisibleSkills = () => {
        const endIndex = index + visibleSkills;
        if (endIndex <= skills.length) {
            return skills.slice(index, endIndex);
        }
        return skills.slice(index).concat(skills.slice(0, endIndex - skills.length));
    };

    const translateX = -index * 0; // Adjust based on the width percentage of each skill




        return (
            <div className="exp">
                <h1>EXPERIENCE</h1>
                <h2>Here are all the languages, tools and apps I am proficient in:</h2>

                <div className="carousel">
                    <button className="carousel-button left" onClick={handlePrevClick}>
                        &lt;
                    </button>
                    <div className="carousel-track-container">
                        <div
                            className="carousel-track"
                            ref={trackRef}
                            style={{transform: `translateX(${translateX}%)`}}
                        >
                            {getVisibleSkills().map((skill, i) => (
                                <div key={i} className="skill">
                                    <img src={skill.img} alt={skill.title} width="100px"/>
                                    <p>{skill.title}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button className="carousel-button right" onClick={handleNextClick}>
                        &gt;
                    </button>
                </div>


                <button className="back-button" onClick={goBack}>
                    ← Back
                </button>

            </div>
        );


}

export default Exp;