import { useRouter } from 'next/router';
import Layout from '../../components/layout';
import { getPostData } from '../../lib/posts';
import utilStyles from '../../styles/utils.module.css';

import Head from 'next/head';

export async function getStaticProps({ params }) {
    const { slug } = params;
    // console.log(slug);

    let fileID = '';
    for (var idx = 0; idx < slug.length; ++idx) {
        fileID += '/' + slug[idx];
    }

    // console.log(fileID);

    const postData = await getPostData(fileID);

    // console.log(postData);

    return {
      props: {
        postData,
      },
    };
}

export async function getStaticPaths() {
    return {
      paths: [],
      fallback: true,
    };
}

const Comment = ( { postData } ) => {
    const router = useRouter();

    // console.log(postData.title);

  return (
    <Layout>
        <Head>
            <title>{postData.title}</title>
        </Head>
        <article>
            <h1 className={utilStyles.headingXl}>{postData.title}</h1>
            <div className={utilStyles.lightText}>
                <Date dateString={postData.date} />
            </div>
            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>
    </Layout>
  )
}

export default Comment