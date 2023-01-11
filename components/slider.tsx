import Link from "next/link";
import React, { useState } from "react";
import Lifesaver from "./lifesaver";
import { Projects } from "./projects";

const Slider = ({ projects }) => {
    const [current, setCurrent] = useState(0)
    const length = projects.length;

    const nextProject = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    }

    const prevProject = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    }

    if(!Array.isArray(projects) || projects.length <= 0) {
        return null;
    }

    return (
        <div className='flex flex-row items-start justify-center gap-2 p-1 py-10 md:gap-5 md:p-5'>
            <span className='self-center order-1' onClick={prevProject}>
                <Lifesaver arrowDirection="left" />
            </span>
            {Projects.map((project, index) => {
                return ( 
                        <div key={index} className={`flex-col md:w-1/2 items-center gap-5 p-5 rounded-md bg-off-white drop-shadow-xl
                        ${index === current ? 'flex order-2' : 'hidden'}
                        ${index - 1 === current || (current == length - 1 && index === 0) ? 'md:flex md:order-3' : ''}
                        ${index - 2 === current || (current == length - 2 && index === 0) || (current == length - 1 && index === 1)  ? 'lg:flex lg:order-4' : ''}
                        `}>
                            <Link href={`/projects/${project.slug}`}>
                                <h3 className='text-lg cursor-pointer hover:text-swim-area hover:underline'>{project.title}</h3>
                            </Link>
                            <img className='w-5/6 rounded-sm' src={project.image} />
                            <div className='flex flex-row gap-3'>
                                <a href={project.livePreview} target="_blank" className={`text-sm hover:underline ${project.livePreview == '' ? 'pointer-events-none text-gray-500 opacity-75' : ''}`}>
                                    &#128421; Live Preview
                                </a>
                                <a href={project.sourceCode} target="_blank" className={`text-sm hover:underline ${project.sourceCode == '' ? 'pointer-events-none text-gray-500 opacity-75' : ''}`}>
                                    &#128193; Source Code
                                </a>
                            </div>
                            <p className='text-sm'>{project.description}</p>
                        </div>
                )
            })}
            <span className='self-center order-3 md:order-4 lg:order-5' onClick={nextProject}>
                <Lifesaver arrowDirection="right"/>
            </span>
        </div>
    )
}


export default Slider;