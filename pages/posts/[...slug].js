import { useRouter } from 'next/router';
import Layout from '../../components/layout';
// import { getPostData } from '../../lib/posts';

// export async function getStaticProps({ params }) {
    
//     const postData = await getPostData(slug);
//     return {
//       props: {
//         postData,
//       },
//     };
// }

// export async function getStaticPaths() {
//     return {
//       paths: [
//             {
//                 params: {
//                     slug: ['any', 'haha']
//                 }
//             },
//       ],
//       fallback: false,
//     };
// }

const Comment = ( { postData } ) => {
    const router = useRouter();
    const slug = (router.query.slug) || [];
    console.log(slug);

  return (
    <Layout>
        {/* <Head>
            <title>{postData.title}</title>
        </Head>
        <article>
            <h1 className={utilStyles.headingXl}>{postData.title}</h1>
            <div className={utilStyles.lightText}>
                <Date dateString={postData.date} />
            </div>
            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article> */}
        <h2>Hello {slug}</h2>
    </Layout>
  )
}

export default Comment