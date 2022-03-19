import Head from 'next/head'
import Image from 'next/image'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
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
        topLayer = `${utilStyles.backgroundShallow}`
        return `${utilStyles.backgroundSand}`;
      case "blog":
        topLayer = `${utilStyles.backgroundShallow}`
        return `${utilStyles.backgroundSeaFoam}`;
      default:
        topLayer = `${utilStyles.backgroundShallow}`
        return `${utilStyles.backgroundSand}`;
    }
  }

  return (
    <div className={ setBackground() }>
      <Head>
        <link rel="icon" href="/favicon.ico" />
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
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        {Props.pageName == "home" ? (
          <>
            <div className={utilStyles.container}>
              <Image
                priority
                src="/images/profile.jpg"
                className={utilStyles.borderCircle}
                height={144}
                width={144}
                alt={name}
              />
              <h1 className={utilStyles.heading2Xl}>{name}</h1>
              <p>Full-stack developer and student of life. Interested in
                equitable access to information, providing everyone the chance for success 
                and the disruption of legacy institutions.</p> 
            </div>
          </>
        ) : (
          <>
            <div className={utilStyles.container}>
              <Link href="/">
                <a>
                  <Image
                    priority
                    src="/images/profile.jpg"
                    className={utilStyles.borderCircle}
                    height={108}
                    width={108}
                    alt={name}
                  />
                </a>
              </Link>
              <h2 className={utilStyles.headingLg}>
                <Link href="/">
                  <a className={utilStyles.colorInherit}>{name}</a>
                </Link>
              </h2>
            </div>
            <Wave isHome={false} layer={1}/>
          </>
        )}
      </header>
      <main>{Props.children}</main>
      {Props.pageName != "home" && (
        <div className={` ${styles.backToHome} ${topLayer} `}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  )
}