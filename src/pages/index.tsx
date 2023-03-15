import Head from 'next/head';
import { GetServerSideProps, GetStaticProps } from 'next';
import { SubscribeButton } from '../components/SubscribeButton';
import styles from './home.module.scss';
import { stripe } from '../services/stripe';

interface HomeProps {
    product: {
        priceId: string;
        amount: number;
    }
}

export default function Home({ product }: HomeProps) {
    return (
        <>
            <Head>
                <title> Home | ig.news </title>
            </Head>
            <main className={styles.contentContainer}>
                <section className={styles.hero}>
                    <span> 👏 Hey, welcome </span>
                    <h1> News about  <br /> the <span>React</span> world.</h1>
                    <p>
                        Get access to all the publications <br />
                        <span> for {product.amount} month</span>
                    </p>

                    <SubscribeButton priceId={product.priceId}/>
                </section>

                <img src="/images/avatar.svg" alt="Girl coding" />
            </main>
        </>
    )
}

// SSR - Server Side Rendering
// export const getServerSideProps: GetServerSideProps = async () => {
//     const price = await stripe.prices.retrieve('price_1Mlh3mHUOpTgsE9bHctyXqla', {
//         expand: ['product'] // expand -> obter todas as informações do produto
//     })

//     const product = {
//         priceId: price.id,
//         amount: new Intl.NumberFormat('en-US', {
//             style: 'currency',
//             currency: 'USD',
//         }).format(price.unit_amount / 100,)
//     }

//     return {
//         props: {
//             product,
//         }
//     }
// }


// SSG - Static Site Generation
// Uma nova camada que após passar pelo servidor node, salva o HTML de
// forma estática para não fazer todo o processo novamente.
// Processo é revalidado a cada tempo que é setado no revalidate

export const getStaticProps: GetStaticProps = async () => {
    const price = await stripe.prices.retrieve('price_1Mlh3mHUOpTgsE9bHctyXqla', {
        expand: ['product'] // expand -> obter todas as informações do produto
    })

    const product = {
        priceId: price.id,
        amount: new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(price.unit_amount / 100,)
    }

    return {
        props: {
            product,
        },
        revalidate: 60 * 60 * 24 // 24h
    }
}

