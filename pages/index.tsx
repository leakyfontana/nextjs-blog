import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/date'
import Wave from '../components/wave'
import { GetStaticProps } from 'next'
import React from 'react'
import Record from '../components/record'
import { useSession } from "next-auth/react"
import { Session } from 'next-auth'

export default function Home({
  allPostsData
}: {
  allPostsData: {
    date: string
    title: string
    id: string
  }[]
})
{
  

  const { data: session} = useSession()

  //Implemented interface becuase TS did not recognize name as part of user
  interface SessionWithName extends Session {
    user:  {
      accessToken: string,
      refreshToken: string,
      email: string,
      username: string,
      name: string
    };
  }

  var sessionWithName = session as SessionWithName; 

  return (
    // <div className='flex flex-col items-center justify-center w-full h-screen'>
      <Layout pageName={"home"}>
        <Head>
          <title>{siteTitle}</title>
        </Head>
          {/* <div className='flex flex-col items-center justify-center w-full h-screen'> */}
            <section className={`${utilStyles.headingMd} ${utilStyles.seaFoam}`}>
              <Wave isHome={true} layer={0} />
              <div className={utilStyles.container}>
                <h2 className={utilStyles.headingLg}>Resume</h2>
              </div>
            </section>
            <section className={`${utilStyles.headingMd} ${utilStyles.shallow}`}>
              <Wave isHome={true} layer={1} />
              <div className={utilStyles.rowContainer}>
                <Record />
              </div>
            </section>
            <section className={`${utilStyles.headingMd} ${utilStyles.skyBlue}`}>
              <Wave isHome={true} layer={2} />
              <div className={`${utilStyles.container} `}>
                <h2 className={utilStyles.headingLg}>Thoughts</h2>
                <ul className={utilStyles.list}>
                  {allPostsData.map(({ id, date, title }) => (
                    <li className={utilStyles.listItem} key={id}>
                      <Link href={`/posts/${id}`}>
                        <a>{title}</a>
                      </Link>
                      <br />
                      <small className={utilStyles.lightText}>
                        <Date dateString={date} />
                      </small>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          {/* </div> */}
      </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}
