import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const prisma = new PrismaClient()
  const joke = req.query.joke
  if (!(typeof joke === 'string')) {
    return res.status(400).send('joke must be a string')
  }
  try {
    await prisma.joke.create({
      data: {
        joke
      }
    })
    res.redirect(`/new?success=true`)
  } catch (e) {
    console.log(e)
    res.redirect(`/new?error=true`)
  }
}
