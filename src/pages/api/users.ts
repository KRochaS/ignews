import { NextApiRequest, NextApiResponse } from 'next';

// eslint-disable-next-line import/no-anonymous-default-export
export default (request: NextApiRequest, response: NextApiResponse) => {
    const users = [
        {id: 1, name: 'Karine' },
        {id: 2, name: 'Diego' },
        {id: 3, name: 'Rafael' }
    ]

    return response.json(users)
}

// Serveless 

// Sube uma máquina virtual, um ambiente isolado
// conforme as rotas vão sendo chamadas
