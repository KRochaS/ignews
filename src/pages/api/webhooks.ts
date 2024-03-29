// Webhooks - É um pattern muito utiizado para integração entre sistemas
// na web, quando irá integrar a aplicação com uma ferramenta de terceiros
// geralmente a ferramenta utiliza desse conceito de webhook pra conseguir 
// avisar a aplicação de que aconteceu alguma coisa por parte da aplicação
// terceira.

//  - Exemplo: 
// 	       Stripe

// 		    - Customer
//  		- Subscription 

// 	  Aplicação
//    		 - Inscrição

// Caso chegue a inscrição automática do próximo mês
// e o cartão do usuário não passa, a aplicação terceira
// precisa de um meio para comunicar a nossa aplicação
// que o cartão não passou.

// Com isso é usado o conceito de webhook, para a aplicação
// terceira avisar a aplicação que algum evento aconteceu.
// Isso aconteceu geralmente por uma rota HTTP



import { NextApiRequest, NextApiResponse } from "next";

import { Readable } from 'stream';
import Stripe from "stripe";
import { stripe } from "../../services/stripe";
import { saveSubscription } from "./_lib/manageSubscription";

async function buffer(readable: Readable) {
    const chunks = [];

    for await (const chunk of readable) {
        chunks.push(
            typeof chunk === "string" ? Buffer.from(chunk) : chunk
        );
    }

    return Buffer.concat(chunks);
}

export const config = {
    api: {
        bodyParser: false
    }
}

const relevantEvents = new Set([
    'checkout.session.completed',
    'customer.subscription.updated',
    'customer.subscription.deleted',
]);

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method === 'POST') {
        const buf = await buffer(req);
        const secret = req.headers['stripe-signature'];


        let event: Stripe.Event;

        try {
            event = stripe.webhooks.constructEvent(
                buf, secret, process.env.STRIPE_WEBHOOK_SECRET
            )
        } catch (err) {
            return res.status(400).send(`webhook error: ${err.message}`);
        }

        const { type } = event;

        console.log(type);
        if (relevantEvents.has(type)) {
            try {
                switch (type) {
                    case 'customer.subscription.updated':
                    case 'customer.subscription.deleted':


                        const subscription = event.data.object as Stripe.Subscription;

                        await saveSubscription(
                            subscription.id,
                            subscription.customer.toString(),
                            false,
                        );

                            
                        break;
                    case 'checkout.session.completed':
                        const checkoutSession = event.data.object as Stripe.Checkout.Session;

                        await saveSubscription(
                            checkoutSession.subscription.toString(),
                            checkoutSession.customer.toString(),
                            true
                        )


                        console.log(checkoutSession);
                        break;
                    default:
                        throw new Error('Unhandled event.')
                }

            } catch (err) {
                return res.json({ error: 'webhook handler failed.' })
            }
        }




        res.json({ received: true });
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method not allowed');
    }
}