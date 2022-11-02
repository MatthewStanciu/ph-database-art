import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const prisma = new PrismaClient()
  const message = req.body.message
  if (!(typeof message === 'string')) {
    return res.status(400).send('message must be a string')
  }
  try {
    await prisma.message.create({
      data: {
        message
      }
    })
    res.json({ ok: true })
  } catch (e) {
    console.log(e)
    res.json({ ok: false })
  }
}
