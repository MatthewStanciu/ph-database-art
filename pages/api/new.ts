import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const prisma = new PrismaClient()
  const joke = req.body.joke
  if (!(typeof joke === 'string')) {
    return res.status(400).send('joke must be a string')
  }
  try {
    await prisma.joke.create({
      data: {
        joke
      }
    })
    res.json({ ok: true })
  } catch (e) {
    console.log(e)
    res.json({ ok: false })
  }
}
