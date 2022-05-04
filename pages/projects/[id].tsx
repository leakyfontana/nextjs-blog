import { GetStaticPaths, GetStaticProps } from "next"
import { Head } from "next/document"
import React from "react"
import Layout from "../../components/layout"
import { getAllProjectIds, getProjectData } from "../../lib/projects"
import Date from '../../components/date'

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const projectData = await getProjectData(params.id as string)
    return {
      props: {
        projectData
      }
    }
  }
  
  export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getAllProjectIds()
    return {
      paths,
      fallback: false
    }
  }
  
  export default function Project({
    projectData
  }: {
    projectData: {
      title: string
      date: string
      contentHtml: string
    }
  }) {
    return (
      <Layout pageName={"blog"}>
        <div className=''>
          {/* <Head>
            <title>{projectData.title}</title>
          </Head> */}
          <article className='flex flex-col items-center justify-center gap-10 px-20 md:flex-row bg-shallow'>
            <div className='block md:flex md:flex-col'>
              <h2 className='text-4xl'>{projectData.title}</h2>
              <div className='text-stone-600'>
                <Date dateString={projectData.date} />
              </div>
            </div>
            <div className='block md:flex'>
              <div dangerouslySetInnerHTML={{ __html: projectData.contentHtml }} />
            </div>
          </article>
        </div>
      </Layout>
    )
  }