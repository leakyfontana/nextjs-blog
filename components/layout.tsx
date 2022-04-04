import Head from 'next/head'
import Link from 'next/link'
import Wave from './wave'
import Image from 'next/image'

const name = 'Xander Dyer'
export const siteTitle = 'Who is Xander Dyer?'

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
        {/* <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" /> */}
      </Head>
        {Props.pageName == "home" ? (
          <>
            <header className={` ${setBackground()} flex sm:flex-col sm:items-stretch md:items-center md:flex-row pt-3 gap-2`}>
              <div className='flex flex-col items-center w-full sm:p-0 md:p-8 sm:order-1 md:order-2'>
              <img
                  src="/images/profile.jpg"
                  className='rounded-full md:w-full sm:w-4/12 drop-shadow-xl'
                  alt={name}
              />
              </div>
              <div className='flex flex-col items-center w-full gap-5 sm:px-8 md:px-0 md:pl-12 md:order-1 sm:order-2'>
                <h1 className='text-5xl text-center'>{name}</h1>
                <p className='text-xl'>Full-stack developer and student of life. Interested in
                  equitable access to information 
                  and the disruption of legacy institutions.</p>
              </div>
            </header>
          </>
        ) : (
          <>
            <header className={` ${setBackground()} flex sm:flex-col sm:items-stretch md:items-center md:flex-row pt-3 gap-2`}>
              <div className='flex flex-col items-center w-full sm:p-0 md:p-8 sm:order-1 md:order-2'>
                <img
                  src="/images/profile.jpg"
                  className='w-2/12 rounded-full drop-shadow-xl'
                  alt={name}
                  />
                <h2 className='text-3xl hover:underline'>
                  <Link href="/">
                    <a className='text-deep-sea hover:text-white'>{name}</a>
                  </Link>
                </h2>
              </div>
            </header>
            <Wave isHome={false} layer={1}/>
          </>
        )}
      <main>{Props.children}</main>
      {Props.pageName != "home" && (
        <div className={` ${topLayer} px-10 py-5 text-xl text-white hover:underline`}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </>
  )
}