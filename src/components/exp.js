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

export default function Experience({ goBack }) {
    const sceneRef = useRef(null);

    useEffect(() => {
        // 1) create engine + world
        const engine = Engine.create();
        engine.gravity.y = 1; // enable gravity
        const world = engine.world;

        // 2) create renderer
        const render = Render.create({
            element: sceneRef.current,
            engine: engine,
            options: {
                width: 1090,
                height: 500,
                wireframes: false,
                background: 'transparent',
            },
        });
        Render.run(render);

        // 3) create runner
        const runner = Runner.create();
        Runner.run(runner, engine);

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
            { img: htmlLogo,   title: 'HTML' },
            { img: cssLogo,    title: 'CSS' },
            { img: jsLogo,     title: 'JavaScript' },
            { img: reactLogo,  title: 'React' },
            { img: javaLogo,   title: 'Java' },
            { img: pythonLogo, title: 'Python' },
            { img: cLogo,      title: 'C' },
            { img: cppLogo,    title: 'C++' },
            { img: svLogo,     title: 'SystemVerilog' },
            { img: gitLogo,    title: 'Git' },
            { img: matlabLogo, title: 'Matlab' },
            { img: mysqlLogo,  title: 'MySQL' },
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

        Promise.all(loadImgs).then((skills) => {
            const SIZE = 80;
            // 6) spawn each body
            const bodies = skills.map((s, i) => {
                // scale sprite so it fills the box
                const xScale = SIZE / s.w;
                const yScale = SIZE / s.h;
                // position in a grid near the top
                const cols = 4;
                const x = 200 + Math.random() * 400 + (i % cols) * (SIZE + 10);
                const y =  20 + Math.floor(i / cols) * (SIZE + 10);

                return Bodies.rectangle(x, y, SIZE, SIZE, {
                    restitution: 0.6,
                    friction: 0.1,
                    render: {
                        fillStyle: '#ADD8E6',    // light-blue box
                        strokeStyle: '#fff',
                        lineWidth: 2,
                        sprite: { texture: s.img, xScale, yScale },
                    },
                    label: s.title,
                });
            });
            Composite.add(world, bodies);

            // 7) add mouse drag
            const mouse = Mouse.create(render.canvas);
            const mc = MouseConstraint.create(engine, {
                mouse,
                constraint: { stiffness: 0.2, render: { visible: false } }
            });
            Composite.add(world, mc);
            render.mouse = mouse;

            // 8) draw labels after each render
            Events.on(render, 'afterRender', () => {
                const ctx = render.context;
                ctx.fillStyle = '#fff';
                ctx.font = '12px sans-serif';
                bodies.forEach((b) => {
                    const { x, y } = b.position;
                    ctx.fillText(b.label, x - SIZE/2 + 4, y + SIZE/2 + 12);
                });
            });
        });

        // 9) cleanup on unmount
        return () => {
            Render.stop(render);
            Runner.stop(runner);
            Composite.clear(world, false);
            Engine.clear(engine);
            render.canvas.remove();
            render.textures = {};
        };
    }, []);

    return (
        <div className="exp"
            // style={{ position: 'relative', width: 640, height: 480 }}
        >
            <h1>EXPERIENCE</h1>
            <h2>Here are all the languages, tools and skills I am proficient in:</h2>
            <div ref={sceneRef}/>
            <button
                className="back-button"
                onClick={goBack}
                style={{
                    position: 'absolute',
                    // top: 10,
                    // right: 10,
                    zIndex: 1,
                    background: '#444',
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
