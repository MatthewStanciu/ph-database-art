import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

export async function getJokes() {
  const prisma = new PrismaClient()
  return await prisma.joke.findMany().then((r) => r.reverse())
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let data = await getJokes()
  res.status(200).send(data)
}
