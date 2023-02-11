import prisma from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next'


type Data = {
    title: string;
    desc: string;
}


export default async function handler(
    req: NextApiRequest,  res: NextApiResponse)  {
    if (req.method !== 'POST') {
        res.status(405).send({message: "Only POST request is allowed"})
        return
    }
    const data: Data = req.body

    const result = await prisma.todo.create({
        data: {
            title: data.title,
            desc: data.desc,
        }
    })
    res.status(201).send(result)
}



