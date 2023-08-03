
import { GetStaticPaths, GetStaticProps } from "next"
import { useSession } from "next-auth/react"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect } from "react"
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
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        if(session?.activeSubscription) {
            router.push(`/posts/${post.slug}`)
        }
    
    }, [session, router, post.slug])
    return (
        <>
            <Head>
                <title> {post.title} | Ignews </title>
            </Head>
            <main className={styles.container}>
                <article className={styles.post}>
                    <h1> {post.title}</h1>
                    <time> {post.updatedAt}</time>
                    <div className={`${styles.postContent} ${styles.previewContent}`} dangerouslySetInnerHTML={{__html: post.content}} />
                    <div className={styles.continueReading}>
                        Wanna continue reading?
                        <Link href="/">
                            Subscribe now 🤗
                        </Link>
                    </div>
                </article>
            </main>
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        // posts generated during first login
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
        },
        revalidate: 60 * 30, // 30 minutes
    }
}