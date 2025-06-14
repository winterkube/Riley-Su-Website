import React from "react";
import './contact.css';

function Contact({goBack}) {
    return (
        <div className="contact">

            <h2> CONTACT </h2>
            <p> Email: rileysu05@gmail.com </p>
            <p> LinkedIn: https://www.linkedin.com/in/riley-su-a47b1521a/ </p>
            <p> GitHub: https://github.com/winterkube </p>
            <p> Instagram: @winter.kube </p>
            <p> Discord: @winter.kube</p>


            <button className="back-button" onClick={goBack}>
                ← Back
            </button>

        </div>
    );
}

export default Contact;