// import './App.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import Home from "./components/home";
// import Exp from "./components/exp";
// import Misc from "./components/misc";
// import Contact from "./components/contact";
// // import Nav from "./components/nav";
// import FAQ from "./components/FAQ";
// import WindowFrame from './components/WindowFrame';
// function App() {
//   return (
//       <div className="App">
//           {/*<Nav/>*/}
//           <WindowFrame title="RileySu.exe">
//               <div className="start-screen">
//                   <h1 className="start-title">Riley Su</h1>
//                   <div className="menu-buttons">
//                       <button>About</button>
//                   </div>
//               </div>
//           </WindowFrame>
//           <Home/>
//           <Exp/>
//           <Misc/>
//           <Contact/>
//           <FAQ/>
//       </div>
//   );
// }
//
// src/About.jsx
// src/App.jsx
import React, { useState } from 'react';
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

    // The “main menu”
    const Menu = ({ goTo }) => (
        <div className="menu-screen">
            <h1 className="menu-title">Riley Su</h1>
            <div className="menu-buttons">
                {['about', 'projects', 'experience', 'misc', 'contact'].map((section) => (
                    <button key={section} onClick={() => goTo(section)}>
                        {section.charAt(0).toUpperCase() + section.slice(1)}
                    </button>
                ))}
            </div>
        </div>
    );

    // Map view names to components, passing down goBack / goTo
    const views = {
        menu: <Menu goTo={setView} />,
        about: <About goBack={() => setView('menu')} />,
        experience: <Experience goBack={() => setView('menu')} />,
        projects: <Projects goBack={() => setView('menu')} />,
        misc: <Misc goBack={() => setView('menu')} />,
        contact: <Contact goBack={() => setView('menu')} />,
    };

    return (
        <div className="app-container">
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
    );
}