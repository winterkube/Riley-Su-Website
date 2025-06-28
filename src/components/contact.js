import React from "react";
import './contact.css';
import insta from './images/instagram.png';
import discord from './images/discord.png';
import gmail from './images/gmail.png';
import github from './images/github.png';

import linked from './images/linkedin.png';

const msgFunc = () => {
    window.confirm("please");
}
function Contact({goBack}) {
    return (
        <div className="contact">

            <h1> CONTACT </h1>
            <p> <img src = {gmail} /> Email: <a href="mailto:rileysu05@gmail.com" target={"_blank"}> rileysu05@gmail.com </a></p>
            <p> <img src = {linked} /> LinkedIn: Riley Su <a href="https://www.linkedin.com/in/riley-su-a47b1521a/" target={"_blank"}> (Link) </a></p>
            <p><img src={github}/> GitHub: winterkube <a href="https://github.com/winterkube" target={"_blank"}> (Link) </a></p>
            <p><img src={insta}/> Instagram: @winter.kube </p>
            <p> <img src = {discord} /> Discord: @winter.kube</p>

            <div className="message" onClick={msgFunc}> MESSAGE TO EMPLOYERS </div>


            <button className="back-button" onClick={goBack}>
                ← Back
            </button>

        </div>
    );
}

export default Contact;