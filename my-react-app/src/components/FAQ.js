
import React, { useState } from 'react';
import './FAQ.css';

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqs = [

        {
            question: "Why did you decide to pursue computer engineering?",
            answer: "When I graduated from high school, I knew I wanted to do something engineering related, as math, creativity, and problem-solving were my strongest abilities growing up. " +
                " But I was quite torn on which sub-discipline of engineering to pursue next, as each one came with their own pros and cons." +
                " Some researching and self-questioning made me realize that computer engineering was my best bet - a good combination of problem-solving skills, promising job prospects, and my childhood love for the digital world convinced me." +
                " And although my second year has been challenging, with me heading in with little coding experience, I've begun to feel confident that I picked the right major." +
                " My drive for success and passion for learning has lead me this far - why not keep going?",
        },

        {
            question: "What other hobbies do you have?",
            answer: "Well, for one, I like playing video games like Minecraft and Geometry Dash when I'm free. " +
                " Unfortunately these happen to be the only 2 games I'm actually good at - as much as I love trying out new games, I usually end up getting clobbered." +
                " In other news, I've recently found a patch of cute and approachable wild bunnies which I kinda got addicted to. So now I aspire to earn enough money" +
                " as a software developer to hopefully fund a rabbit army.",
        },

        {
            question: "Why don't you have a proper website domain?",
            answer: "Because I'm poor. (and there's no backend here so GitHub pages will do fine.)",

        },

        {
            question: "Why is your discord username that?",
            answer: "Because it's a good name.",
        },

        {
            question: "Are you single? ",
            answer: "(just kidding. No one would ask a computer major this.)",
        },


        // Add more FAQ items here
    ];

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="wrapper">
            <h2> FAQ </h2>
            {faqs.map((faq, index) => (
                <div key={index} className={`faq ${activeIndex === index ? 'active' : ''}`}>
                    <button className="accordion" onClick={() => toggleFAQ(index)}>
                        {faq.question}
                        <i className={`fa-solid ${activeIndex === index ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                    </button>
                    <div className="panel" style={{ display: activeIndex === index ? 'block' : 'none' }}>
                        <p>{faq.answer}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FAQ;
