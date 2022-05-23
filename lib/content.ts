import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'posts')
const projectsDirectory = path.join(process.cwd(), 'projects')

export function getSortedContentData(contentType: string) {
  // Get file names under /posts
  var directory = contentType === 'posts' ? postsDirectory : projectsDirectory;
  const fileNames = fs.readdirSync(directory)
  const allContentData = fileNames.map(fileName => {
    // Remove ".mdx" from file name to get id
    const id = fileName.replace(/\.mdx?$/, '')

    // Read markdown file as string
    const fullPath = path.join(directory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      id,
      ...(matterResult.data as { date: string; title: string })
    }
  })
  // Sort posts by date
  return allContentData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getAllContentIds(contentType: string) {
  var directory = contentType === 'posts' ? postsDirectory : projectsDirectory;
  const fileNames = fs.readdirSync(directory)
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.mdx?$/, '')
      }
    }
  })
}

export async function getContentData(id: string, contentType: string) {
  var directory = contentType === 'posts' ? postsDirectory : projectsDirectory;
  const fullPath = path.join(directory, `${id}.mdx`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...(matterResult.data as { date: string; title: string })
  }
}