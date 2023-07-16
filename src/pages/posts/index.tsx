import Prismic from '@prismicio/client';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { getPrismicClient } from '../../services/prismic';
import styles from './styles.module.scss';


type Post = {
    slug: string;
    title: string;
    excerpt: string;
    updatedAt: string;
}
interface PostsProps {
    posts: Post[]
}

export default function Posts({ posts }: PostsProps) {
    return (
        <>
            <Head>
                <title> Posts | Ignews </title>
            </Head>
            <main className={styles.container}>
                <div className={styles.posts}>


                    {posts.map(post => (
                        <Link key={post.slug} href={`/posts/${post.slug}`}>
                            <a>
                                <time> {post.updatedAt} </time>
                                <strong> {post.title} </strong>
                                <p>{post.excerpt}</p>
                            </a>
                        </Link>
                    ))}

                </div>
            </main>
        </>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const prismic = getPrismicClient();

    const response = await prismic.query([Prismic.Predicates.at('document.type', 'post')], {
        fetch: ['posts.title', 'posts.content'],
        pageSize: 100,
    })

    const posts = response.results.map((post: any) => {

        return {
            slug: post.uid,
            title: post.data.title,
            excerpt: post.data.content.map((content) => {
                const index = content.text.indexOf('\n');
                return content.text.substring(0, index);
            }),
            updatedAt: new Date(post.last_publication_date).toLocaleDateString('en', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            })
        }
    })

    return {
        props: {
            posts
        }
    }
}