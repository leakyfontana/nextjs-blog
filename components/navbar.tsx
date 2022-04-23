import Link from 'next/link'
import React from 'react'
import Leakylogo from './leakylogo'
import Navburger from './navburger'

export default function Navbar() {
    return (
        <>
            <header className='bg-sand'>
                <div className='flex-row justify-between hidden px-8 pt-5 md:flex'>
                    <Leakylogo />
                    <div className='flex flex-row justify-end gap-6 text-xl text-white'>               
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
                    <Leakylogo />
                    <Navburger />
                </div>
            </header>
        </>
    )
}