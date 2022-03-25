import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from 'utilities/mongodb'

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  const { db } = await connectToDatabase()

  switch (request.method) {
    case 'POST':
      const something = await db
        .collection('favorite-restaurants')
        .insertOne({ liked: true })
      response.json(something)

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
