import prisma from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        res.status(405).send({message: "Only GET request is allowed"})
        return
    }

    const result = await prisma.todo.findMany()

    res.status(200).send(result)
}
