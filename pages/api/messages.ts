import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

export async function getMessages() {
  const prisma = new PrismaClient()
  return await prisma.message.findMany().then((r) => r.reverse())
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let data = await getMessages()
  res.status(200).send(data)
}
