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
    'checkout.session.completed'
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

        if(relevantEvents.has(type)) {
            console.log('Evento recebido', event);
        }




        res.json({ received: true });
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method not allowed');
    }
}