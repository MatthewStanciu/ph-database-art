import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const prisma = new PrismaClient()
  let data = await prisma.message.findMany().then((r) => r.reverse())
  res.status(200).send(data)
}
