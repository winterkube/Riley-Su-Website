// src/Experience.jsx
import React, { useEffect, useRef } from 'react';
import {
    Engine,
    Render,
    Runner,
    Bodies,
    Composite,
    Mouse,
    MouseConstraint,
    Events,
    Query,
} from 'matter-js';
import './exp.css';

import htmlLogo    from './images/htmllogo.png';
import cssLogo     from './images/css.png';
import jsLogo      from './images/JavaScript.png';
import reactLogo   from './images/react.png';
import javaLogo    from './images/java.png';
import pythonLogo  from './images/python.png';
import cLogo       from './images/c.png';
import cppLogo     from './images/cpp.png';
import svLogo      from './images/systemverilog.png';
import gitLogo     from './images/git.png';
import matlabLogo  from './images/matlab.png';
import mysqlLogo   from './images/mysql.png';

import docsLogo from './images/docs.png';
import sheetsLogo from './images/sheets.png';
import slidesLogo from './images/slides.png';
import canvaLogo from './images/canva.png';
import davinciLogo from './images/davinci.png';

export default function Experience({ goBack, scale }) {
    const sceneRef = useRef(null);

    useEffect(() => {
        // 1) create engine + world
        const engine = Engine.create();
        engine.gravity.y = 1;
        const world = engine.world;

        // 2) renderer, tell it our CSS-scale so it can set pixelRatio
        //    pixelRatio = (actual canvas pixels) / (CSS pixels) = 1/scale
        const pixelRatio = 1 / scale;

        const render = Render.create({
            element: sceneRef.current,
            engine,
            options: {
                width: 1080,
                height: 650,
                wireframes: false,
                background: 'transparent',
                pixelRatio,         // ← Matter will now auto-scale mouse coords correctly
            },
        });
        Render.run(render);

        // 3) create runner
        const runner = Runner.create();
        Runner.run(runner, engine);
        const canvas = render.canvas;
        // 4) add walls to contain bodies
        const w = render.options.width,
            h = render.options.height,
            t = 50;
        Composite.add(world, [
            Bodies.rectangle(w/2, h + t/2, w, t, { isStatic: true }),
            Bodies.rectangle(-t/2, h/2, t, h, { isStatic: true }),
            Bodies.rectangle(w + t/2, h/2, t, h, { isStatic: true }),
            Bodies.rectangle(w/2, -t/2, w, t, { isStatic: true }),
        ]);

        // 5) define skills and preload images
        const raw = [
            { img: htmlLogo,   title: 'HTML',        color: 'rgba(120,166,180,0.9)' },  // light-blue
            { img: cssLogo,    title: 'CSS',         color: 'rgba(120,166,180,0.9)' },
            { img: jsLogo,     title: 'JavaScript',  color: 'rgba(120,166,180,0.9)' },
            { img: reactLogo,  title: 'React',      color: 'rgba(120,166,180,0.9)' },
            { img: javaLogo,   title: 'Java',        color: 'rgba(120,166,180,0.9)' },
            { img: pythonLogo, title: 'Python',      color: 'rgba(120,166,180,0.9)' },
            { img: cLogo,      title: 'C',           color: 'rgba(120,166,180,0.9)' },
            { img: cppLogo,    title: 'C++',         color: 'rgba(120,166,180,0.9)' },
            { img: svLogo,     title: 'Verilog',     color: 'rgba(120,166,180,0.9)' },
            { img: gitLogo,    title: 'Git',        color: 'rgba(120,166,180,0.9)' },
            { img: matlabLogo, title: 'Matlab',      color: 'rgba(120,166,180,0.9)' },
                // new “office” skills with light-purple
            { img: docsLogo,   title: 'Google Docs',  color: 'rgba(180,152,236,0.9)' },
            { img: sheetsLogo, title: 'Google Sheets',color: 'rgba(180,152,236,0.9)' },
            { img: slidesLogo, title: 'Google Slides',color: 'rgba(180,152,236,0.9)' },
            { img: canvaLogo, title: 'Canva',color: 'rgba(180,152,236,0.9)' },
            { img: davinciLogo, title: 'Davinci Resolve',color: 'rgba(180,152,236,0.9)' },

        ];

        // helper: preload and return natural sizes
        const loadImgs = raw.map(
            (s) =>
                new Promise((res) => {
                    const img = new Image();
                    img.src = s.img;
                    img.onload = () => res({ ...s, w: img.naturalWidth, h: img.naturalHeight });
                })
        );

        Promise.all(
            raw.map((s) =>
                new Promise((res) => {
                    const img = new Image();
                    img.src = s.img;
                    img.onload = () => res({ ...s, imgElement: img });
                })
            )
        ).then((skills) => {
            const SIZE = 90;
            const cols = 4;
            // 4) Create one body per skill, with fillStyle only
            const bodies = skills.map((s, i) => {
                const x = 150 + 500 * Math.random() + (i % cols) * (SIZE + 10);
                const y = 100 * Math.random()  + Math.floor(i / cols) * (SIZE + 10);
                const b = Bodies.rectangle(x, y, SIZE + 15, SIZE + 50, {
                    restitution: 0.6,
                    friction: 0.1,
                    render: {
                        fillStyle: s.color,      // now each skill picks its own color
                        strokeStyle: '#fff',
                        opacity: 0.9,
                        // borderWidth: 2,
                        // borderRadius: 5,
                        lineWidth: 2,
                        zIndex: 5,
                    },
                    label: s.title,
                });
                // attach the preloaded image for manual draw
                b.mySprite = s.imgElement;
                return b;
            });

            Composite.add(world, bodies);


            // 6) After each render pass: draw sprites + captions
            Events.on(render, 'afterRender', () => {
                const ctx = render.context;
                bodies.forEach((b) => {
                    const { x, y } = b.position;
                    const angle = b.angle;

                    // draw the sprite centered on the body
                    ctx.save();
                    ctx.translate(x, y);
                    ctx.rotate(angle);
                    ctx.drawImage(b.mySprite, -SIZE/2 *0.9, -SIZE/2 * 1.2, SIZE*0.9, SIZE* 0.9);
                    // ctx.restore();
                    //
                    // // draw the caption
                    // ctx.save();
                    ctx.fillStyle    = '#fff';
                    ctx.font         = '16px Lexend, sans-serif';
                    ctx.textAlign    = 'center';
                    ctx.textBaseline = 'top';

                    ctx.fillText(b.label, SIZE/2 - 45, SIZE - 50,SIZE);
                     // ctx.translate(x, y);
                     // ctx.rotate(angle);
                    ctx.restore();
                });
            });

            // Hover‐detection: change <canvas> cursor when over a body
            render.canvas.addEventListener('mousemove', (e) => {
                const rect = render.canvas.getBoundingClientRect();
                const x = (e.clientX - rect.left) * pixelRatio;
                const y = (e.clientY - rect.top)  * pixelRatio;
                const under = Query.point(bodies, { x, y });
                canvas.style.cursor = under.length ? 'pointer' : 'default';
            });

        });

        const mouse = Mouse.create(render.canvas);
        const mc = MouseConstraint.create(engine, {
            mouse,
            constraint: { stiffness: 0.2, render: { visible: false } },
        });
        Composite.add(engine.world, mc);
        render.mouse = mouse;

        // 9) cleanup on unmount
        return () => {
            // window.removeEventListener('resize', updatePixelRatio);
            Render.stop(render);
            Runner.stop(runner);
            Composite.clear(world, false);
            Engine.clear(engine);
            canvas.remove();
            render.textures = {};
        };
    }, [scale]);

    return (
        <div className="exp"
            // style={{ position: 'relative', width: 640, height: 480 }}
        >
            <h1>EXPERIENCE</h1>
            <h2>Here are all the languages, tools and skills I am proficient in:</h2>
            <div className="scene" ref={sceneRef}/>
            <button
                className="back-button"
                onClick={goBack}
                style={{
                    position: 'absolute',
                    // top: 10,
                    // right: 10,
                    zIndex: 1,
                    // background: '#444',
                    color: '#eee',
                    border: '2px solid #eee',
                    padding: '6px 12px',
                    cursor: 'pointer',
                }}
            >
                ← Back
            </button>
        </div>
    );
}
