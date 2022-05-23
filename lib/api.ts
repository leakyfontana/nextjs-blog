import fs from 'fs';
import matter from 'gray-matter';
import { join } from 'path';
import { POSTS_PATH, PROJECTS_PATH } from '../utils/mdxUtils';

export function getPostSlugs(): string[] {
  return fs.readdirSync(POSTS_PATH);
}

type PostItems = {
  [key: string]: string;
};

export function getPostBySlug(slug: string, fields: string[] = []): PostItems {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = join(POSTS_PATH, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const items: PostItems = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug;
    }
    if (field === 'content') {
      items[field] = content;
    }
    if (data[field]) {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllPosts(fields: string[] = []): PostItems[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

export function getProjectSlugs(): string[] {
    return fs.readdirSync(PROJECTS_PATH);
  }
  
  type ProjectItems = {
    [key: string]: string;
  };
  
  export function getProjectBySlug(slug: string, fields: string[] = []): ProjectItems {
    const realSlug = slug.replace(/\.mdx$/, '');
    const fullPath = join(PROJECTS_PATH, `${realSlug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
  
    const items: ProjectItems = {};
  
    // Ensure only the minimal needed data is exposed
    fields.forEach((field) => {
      if (field === 'slug') {
        items[field] = realSlug;
      }
      if (field === 'content') {
        items[field] = content;
      }
      if (data[field]) {
        items[field] = data[field];
      }
    });
  
    return items;
  }
  
  export function getAllProjects(fields: string[] = []): ProjectItems[] {
    const slugs = getProjectSlugs();
    const projects = slugs
      .map((slug) => getProjectBySlug(slug, fields))
      // sort posts by date in descending order
      .sort((project1, project2) => (project1.date > project2.date ? -1 : 1));
    return projects;
  }