import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

// The two lines below behavior the same
// const postsDirectory = path.join(process.cwd(), 'posts');
const postsDirectory = './posts'

export function getMdFiles(dir = postsDirectory) {
  let mdFiles = [];

  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file);

    // console.log(dir);
    // console.log(file);
    // console.log(filePath);

    const fileStat = fs.statSync(filePath);

    if (fileStat.isDirectory()) {
      mdFiles = mdFiles.concat(getMdFiles(filePath));
    } else if (file.endsWith('.md')) {
      mdFiles.push(filePath);
    }
  });

  return mdFiles;
}

export function getSortedPostsData() {
  const mdFiles = getMdFiles(postsDirectory);

  console.log(mdFiles);

  const allPostsData = mdFiles.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fileContents = fs.readFileSync(fileName, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id: path.relative(postsDirectory, id),
      ...matterResult.data,
    };
  });

  // console.log(allPostsData);

  return allPostsData;
}

// deprecated
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  // console.log(fileNames);
  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export async function getPostData(id) {
  let fileID = id;
  // for (var idx = 0; idx < id.length; ++id) {
  //   fileID += id[idx];
  // }

  const fullPath = path.join(postsDirectory, `${fileID}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // const returnData = {
  //   id: fileID,
  //   ...matterResult.data,
  // };

  // console.log(returnData);

  // Combine the data with the id
  return {
    id: fileID,
    contentHtml,
    ...matterResult.data,
  };
}
