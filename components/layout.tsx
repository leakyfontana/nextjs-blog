import Head from 'next/head'
import Link from 'next/link'
import Wave from './wave'

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
      <header className={` ${setBackground()} flex flex-col items-center justify-center gap-4 pt-3 w-screen`}>
        {Props.pageName == "home" ? (
          <>
              <img
                src="/images/profile.jpg"
                className='rounded-full sm:w-4/12 md:w-2/12'
                alt={name}
              />
              <h1 className='text-5xl'>{name}</h1>
              <p className='w-7/12'>Full-stack developer and student of life. Interested in
                equitable access to information 
                and the disruption of legacy institutions.</p> 
          </>
        ) : (
          <>
            <img
              src="/images/profile.jpg"
              className='w-1/12 rounded-full '
              alt={name}
              />
            <h2 className='text-3xl'>
              <Link href="/">
                <a className='text-deep-sea'>{name}</a>
              </Link>
            </h2>
            <Wave isHome={false} layer={1}/>
          </>
        )}
      </header>
      <main>{Props.children}</main>
      {Props.pageName != "home" && (
        <div className={` ${topLayer} px-10 py-5 text-xl`}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </>
  )
}