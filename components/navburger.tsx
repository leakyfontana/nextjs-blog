import Link from 'next/link'
import React, { useState } from 'react'
import styles from '../styles/utils.module.css'

export default function Navburger() {
    const [isToggle, setToggle] = useState(false);

    const toggleNav = () => {
        setToggle(!isToggle);
    };

    return (
        <>
            <div className="fixed top-3 right-5 flex flex-col gap-0.5 pt-3 px-2 cursor-pointer z-30" onClick={toggleNav}>
                <svg className="w-14" viewBox="310 190 200 150" xmlns="http://www.w3.org/2000/svg">
                    <g className={`duration-700 drop-shadow-xl ${isToggle ? `${styles.board1} origin-right`: ''}`}>
                        <path d="M 495.958 282.996 C 495.958 293.697 454.178 302.373 402.639 302.373 C 369.597 302.373 340.566 298.807 323.984 293.428 L 
                        331.265 283.013 L 323.621 272.681 C 340.139 267.235 369.354 263.617 402.639 263.617 C 454.178 263.617 495.958 272.293 495.958 282.996 Z" 
                        fill="rgb(244, 248, 243)" stroke="rgb(5, 66, 115)"/>
                        <line fill="rgb(216, 216, 216)" stroke="rgb(5, 66, 115)" x1="496.137" y1="283.119" x2="379.211" y2="283.199"/>
                        <ellipse fill="rgb(194, 178, 128)" stroke="rgb(5, 66, 115)" cx="458.305" cy="283.238" rx="2.46" ry="2.382"/>
                    </g>
                    <g className={`duration-700 drop-shadow-xl ${isToggle ? `${styles.board2} origin-left`: ''}`}>
                        <path d="M 495.119 240.05 C 495.119 250.751 453.339 259.427 401.8 259.427 C 368.758 259.427 339.727 255.861 323.145 250.482 L 330.426 
                        240.067 L 322.782 229.735 C 339.3 224.289 368.515 220.671 401.8 220.671 C 453.339 220.671 495.119 229.347 495.119 240.05 Z" 
                        fill="rgb(244, 248, 243)" stroke="rgb(5, 66, 115)" transform="matrix(-1, 0, 0, -1, 817.901001, 480.097992)"/>
                        <line fill="rgb(216, 216, 216)" stroke="rgb(5, 66, 115)" x1="439.528" y1="239.845" x2="322.602" y2="239.925" transform="matrix(-1, 0, 0, -1, 762.130005, 479.769989)"/>
                        <ellipse fill="rgb(194, 178, 128)" stroke="rgb(5, 66, 115)" cx="-360.434" cy="-239.806" rx="2.46" ry="2.382" transform="matrix(-1, 0, 0, -1, 0, 0)"/>
                    </g>
                </svg>
            </div>
            <div className={`fixed top-0 z-20 w-3/4 h-full left-1/4 bg-seafoam duration-500 ${isToggle ? '': 'translate-x-full'}`}>
                <div className="flex flex-col gap-5 px-5 pt-24 text-2xl text-right text-deep-sea">
                    <Link href="/">
                        <p className='cursor-pointer hover:underline' onClick={toggleNav}>Home &#127968;</p>
                    </Link>
                    <Link href="/#myProjects" scroll={false}>
                        <p className='cursor-pointer hover:underline' onClick={toggleNav} >My Projects &#128679;</p>
                    </Link>
                    <Link href="/#recordPlayer" scroll={false}>
                        <p className='cursor-pointer hover:underline' onClick={toggleNav} >Record Player &#128192;</p>
                    </Link>
                    <Link href="/#blog" scroll={false}>
                        <p className='cursor-pointer hover:underline' onClick={toggleNav}>Blog &#128211;</p>
                    </Link>
                </div>
            </div>
        </>
    )
}