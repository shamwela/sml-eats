import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from 'utilities/mongodb'

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  const { db } = await connectToDatabase()

  switch (request.method) {
    case 'POST':
      const slug = request.body.slug
      const something = await db
        .collection('favorite-restaurants')
        .insertOne({ slug })

    case 'GET':
      const restaurants = await db
        .collection('favorite-restaurants')
        .find({})
        .toArray()
      response.json(restaurants)
      break

    default:
      break
  }
}

export default handler
