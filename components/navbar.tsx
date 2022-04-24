import Link from 'next/link'
import React from 'react'
import Leakylogo from './leakylogo'
import Navburger from './navburger'

type layoutProps = {
    pageName: string
}

export default function Navbar(Props: layoutProps) {
    var textColor;

    const setBackground = () => { switch(Props.pageName) {
        case "home":
          textColor='text-white'
          return `bg-sand`;
        case "blog":
          textColor='text-deep-sea'
          return `bg-seafoam`;
        default:
          textColor='text-white'
          return `bg-sand`;
      }
    }

    return (
        <>
            <header className={setBackground()}>
                <div className='flex-row justify-between hidden px-8 pt-5 md:flex'>
                    <Leakylogo pageName={Props.pageName}/>
                    <div className={`flex flex-row justify-end gap-6 text-xl ${textColor}`}>               
                        <Link href="/">
                            <p className='cursor-pointer hover:underline'>Home</p>
                        </Link>
                        <Link href="/#myProjects" scroll={false}>
                            <p className='cursor-pointer hover:underline'>My Projects</p>
                        </Link>
                        <Link href="/#recordPlayer" scroll={false}>
                            <p className='cursor-pointer hover:underline'>Record Player</p>
                        </Link>
                        <Link href="/#blog" scroll={false}>
                            <p className='cursor-pointer hover:underline'>Blog</p>
                        </Link>
                    </div>
                </div>
                <div className='flex flex-row justify-between px-5 pt-4 text-white md:hidden'>
                    <Leakylogo pageName={Props.pageName} />
                    <Navburger />
                </div>
            </header>
        </>
    )
}