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
    <Layout pageName={"home"}>
      <Head>
        <title>{siteTitle}</title>
      </Head>
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
          <h2 className={utilStyles.headingLg}>What's listening to?</h2>
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
