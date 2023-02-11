import prisma from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next'



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log(req.query)
    const {pid} = req.query
    console.log(pid)
    const typo = typeof pid
    console.log(typo)
    const id: number = Number(pid)
    if (isNaN(id) || typeof id !== 'number') {
        console.log(id)
        res.status(400).send({ message: "Invalid request" })
    }

    type UpdateTodoInput = {
        title: string;
        desc: string;
        status: string;
    }
    switch (req.method) {
        case 'GET':
            console.log(id)
            const result = await prisma.todo.findUnique({
                where: {
                    id,
                }
            })
            res.status(200).send(result)
            break
        case 'PUT':
            const updateData: UpdateTodoInput = req.body
            console.log(updateData)
            const newresult = await prisma.todo.update({
                where: {
                    id,
                },
                data: {
                    title: updateData.title,
                    desc: updateData.desc,
                    status: updateData.status,
                }
            })
            res.status(200).send(newresult)
            break
        case 'DELETE':
            const deletedResult = await prisma.todo.delete({
                where: {
                    id,
                }
            })
            res.status(200).send({message: "Todo Deleted!", deletedResult})
            break
        default:
            res.status(400).send({message: "Invalid request!"})
    }
}



