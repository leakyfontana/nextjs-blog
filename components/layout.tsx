import Head from 'next/head'
import Link from 'next/link'
import Wave from './wave'
import React from 'react'
import Navbar from './navbar'

const name = 'Xander Dyer'
export const siteTitle = 'LeakyDev | Home'

type layoutProps = {
  children: React.ReactNode,
  pageName: string
}

export default function Layout(Props: layoutProps)

{
  var topLayer;

  const setBackground = () => { switch(Props.pageName) {
      case "home":
        topLayer = `bg-shallow`
        return `bg-sand`;
      case "blog":
        topLayer = `bg-shallow`
        return `bg-seafoam`;
      default:
        topLayer = `bg-shallow`
        return `bg-sand`;
    }
  }

  return (
    <>
      <Head>
         <link rel="icon" href="/favicon.ico" />
      
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta name="og:title" content={siteTitle} />
      </Head>
      <Navbar pageName={Props.pageName}/>
        {Props.pageName == "home" ? (
          <>
            <div className={` ${setBackground()} flex flex-col items-stretch md:items-center md:flex-row pt-3 gap-2`}>
              <div className='flex flex-col items-center order-1 w-full p-0 md:p-8 md:order-2'>
              <img
                  src="/images/OnTheBeach.svg"
                  className='w-4/12 md:w-full'
                  alt={name}
              />
              </div>
              <div className='flex flex-col items-center order-2 w-full gap-5 px-8 md:px-0 md:pl-12 md:order-1'>
                <h1 className='text-5xl text-center'>{name}</h1>
                <div className='flex flex-row gap-5'>
                  <button 
                    className='w-16 drop-shadow-lg'   
                    onClick={(e) => {
                      e.preventDefault();
                      window.open('https://github.com/leakyfontana', '_blank');
                    }}
                  >
                    <img src="https://img.icons8.com/3d-fluency/188/null/github.png"/>
                  </button>
                  <button 
                    className='w-16 drop-shadow-lg'   
                    onClick={(e) => {
                      e.preventDefault();
                      window.open('https://www.instagram.com/leakyfontana/', '_blank');
                    }}
                  >
                    <img src="https://img.icons8.com/3d-fluency/94/null/instagram-new.png" />
                  </button>
                  <button 
                    className='w-16 drop-shadow-lg'   
                    onClick={(e) => {
                      e.preventDefault();
                      window.open('https://www.linkedin.com/in/xdyer/', '_blank');
                    }}
                  >
                    <img src="https://img.icons8.com/3d-fluency/188/null/linkedin.png"/>
                  </button>
                  <button 
                    className='w-16 drop-shadow-lg'
                    onClick={(e) => {
                      e.preventDefault();
                      window.open('mailto:xdyer777@gmail.com', '_blank');
                    }}
                  >
                  <img src="https://img.icons8.com/3d-fluency/94/null/mail.png"/>                  
                  </button>
                  <button 
                    className='w-16 drop-shadow-lg'  
                    onClick={(e) => {
                      e.preventDefault();
                      window.open('/files/XanderJDyerResume2023.pdf', '_blank');
                    }}
                  >
                  <img src="https://img.icons8.com/3d-fluency/94/null/document.png"/>
                  </button>
                </div>
                <p className='text-xl'>Full-stack developer and student of life. Interested in
                  equitable access to information 
                  and the disruption of legacy institutions.</p>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className={` ${setBackground()} flex flex-col items-stretch md:items-center md:flex-row pt-3 gap-2`}>
              <div className='flex flex-col items-center order-1 w-full p-0 md:p-8 md:order-2'>
                <img
                  src="/images/OnTheBeach.svg"
                  className='w-2/12'
                  alt={name}
                  />
                <h2 className='text-3xl hover:underline'>
                  <Link className='text-deep-sea hover:text-white' href="/">
                    {name}
                  </Link>
                </h2>
              </div>
            </div>
            <Wave isHome={false} layer={1}/>
          </>
        )}
      <main className="w-screen">{Props.children}</main>
      {Props.pageName != "home" && (
        <div className={` ${topLayer} px-10 py-5 text-xl text-white hover:underline`}>
          <Link href="/">
            ← Back to home
          </Link>
        </div>
      )}
    </>
  )
}