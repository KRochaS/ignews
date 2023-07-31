
import { GetStaticProps } from "next"
import Head from "next/head"
import { getPrismicClient } from "../../../services/prismic"
import styles from '../post.module.scss'

interface PostPreviewProps {
    post: {
        slug: string;
        title: string;
        content: string;
        updatedAt: string;
    }

}

export default function PostPreview({ post }: PostPreviewProps) {
    return (
        <>
            <Head>
                <title> {post.title} | Ignews </title>
            </Head>
            <main className={styles.container}>
                <article className={styles.post}>
                    <h1> {post.title}</h1>
                    <time> {post.updatedAt}</time>
                    <div className={styles.postContent} dangerouslySetInnerHTML={{__html: post.content}} />
                </article>
            </main>
        </>
    )
}

export const getStaticPaths = () => {
    return {
        paths: [],
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { slug } = params;

    const prismic = getPrismicClient();

    const response: any = await prismic.getByUID('post', String(slug), {});

   const content = response.data.content.map((content) => {
        const index = content.text.indexOf('\n');
        return content.text.substring(0, index);
   })

    const post = {
        slug,
        title: response.data.title,
        content: content,
        updatedAt: new Date(response.last_publication_date).toLocaleDateString('en', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        })
    }


   
   
    return {
        props: {
            post,
        }
    }
}