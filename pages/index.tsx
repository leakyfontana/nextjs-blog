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

  //${utilStyles.headingMd}

  //{utilStyles.container}

  var sessionWithName = session as SessionWithName; 

  return (
      <Layout pageName={"home"}>
        <Head>
          <title>{siteTitle}</title>
        </Head>
        <section id="myProjects" className='bg-seafoam'>
          <Wave isHome={true} layer={0} />
          <div className='flex flex-col items-center gap-2'>
            <h2 className='text-2xl'>My Projects</h2>
          </div>
        </section>
        <section id="recordPlayer" className='bg-shallow'>
          <Wave isHome={true} layer={1} />
          <div className='flex flex-col items-center justify-center gap-5 p-4 md:gap-10 md:flex-row'>
            <Record />
          </div>
        </section>
        <section id="blog" className='bg-sky-blue'>
          <Wave isHome={true} layer={2} />
          <div className='flex flex-col items-center gap-2'>
            <h2 className='text-2xl'>Thoughts</h2>
            <ul className='list-none'>
              {allPostsData.map(({ id, date, title }) => (
                <li key={id}>
                  <div className='flex flex-col'>
                    <Link href={`/posts/${id}`}>
                      <a className='text-xl text-white hover:underline'>{title}</a>
                    </Link>
                    <small className='text-stone-600'>
                      <Date dateString={date} />
                    </small>
                  </div>
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
