// Todo arquivo dentro da pasta api se torna uma api route.
// Adicionando _ na frente, a pasta não é tratada como uma rota da 
// aplicação

import { fauna } from "../../../services/fauna";


export async function saveSubscription(
    SubscriptionId: string,
    customerId: string,
) {
    // Buscar o usuário no banco do FaunaDB com o ID {customerId}

    // const userRef = await fauna.query(
        
    // )

    // Salvar os dados da subscription no FaunaDB
}