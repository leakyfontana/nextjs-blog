import { format, parseISO } from 'date-fns';
import fs from 'fs';
import matter from 'gray-matter';
import mdxPrism from 'mdx-prism';
import { GetStaticPaths, GetStaticProps } from 'next';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import path from 'path';
import React from 'react';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import rehypeRaw from 'rehype-raw';
import {nodeTypes} from '@mdx-js/mdx';
//import Layout, { WEBSITE_HOST_URL } from '../../components/Layout';
import { MetaProps } from '../../types/layout';
import { projectFilePaths, PROJECTS_PATH } from '../../utils/mdxUtils';
import { PostType } from '../../types/post';
import Layout from '../../components/layout';
import styles from './projects.module.css'

// Custom components/renderers to pass to MDX.
// Since the MDX files aren't loaded by webpack, they have no knowledge of how
// to handle import statements. Instead, you must include components in scope
// here.
const components = {
  Head,
  Image,
  Link,
};

type ProjectPageProps = {
  source: MDXRemoteSerializeResult;
  frontMatter: PostType;
};

const ProjectPage = ({ source, frontMatter }: ProjectPageProps): JSX.Element => {
  const customMeta: MetaProps = {
    title: `${frontMatter.title} - Xander Dyer`,
    description: frontMatter.description,
    //image: `${WEBSITE_HOST_URL}${frontMatter.image}`,
    date: frontMatter.date,
    type: 'article',
  };
  return (
    <Layout pageName={"blog"}>
      <article className="flex flex-col justify-center bg-shallow">
        <h1 className="mb-3 text-gray-900 dark:text-white">
          {frontMatter.title}
        </h1>
        <p className="mb-10 text-sm text-gray-500 dark:text-gray-400">
          {format(parseISO(frontMatter.date), 'MMMM dd, yyyy')}
        </p>
        <div className={`prose dark:prose-dark ${styles}`}>
          <MDXRemote {...source} components={{
            img: (props) => <img {...props} className = "w-5/6 rounded-sm" /> ,
            h2: (props) => <h2 {...props} className = "text-3xl" /> ,
            h3: (props) => <h3 {...props} className = "text-2xl" /> ,


          }} />
        </div>
      </article>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const projectFilePath = path.join(PROJECTS_PATH, `${params.slug}.mdx`);
  const source = fs.readFileSync(projectFilePath);

  const { content, data } = matter(source);

  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [require('remark-code-titles')],
      rehypePlugins: [mdxPrism, rehypeSlug, [rehypeRaw, {passThrough: nodeTypes}], rehypeAutolinkHeadings],
    },
    scope: data,
  });

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = projectFilePaths
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ''))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};

export default ProjectPage;