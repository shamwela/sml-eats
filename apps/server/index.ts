import { frontendUrl } from './utilities/frontendUrl'
import { NestedItem } from './types/nestedItem'
import express from 'express'
import cors from 'cors'
import xssClean from 'xss-clean'
import helmet from 'helmet'
import authRouter from './routers/auth'
import userRouter from './routers/user'
import authenticationMiddleware from './middlewares/authentication'
import categoryRouter from './routers/category'
import restaurantRouter from './routers/restaurant'
import { prisma } from './prisma/prismaClient'
import { type RestaurantsOnUsers } from '@prisma/client'
import { rateLimit } from 'express-rate-limit'

const app = express()
app.use(
  cors({
    origin: frontendUrl,
    credentials: true,
  })
)
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  })
)
app.use(xssClean())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (request, response) => response.send('SML Eats API'))
app.use('/auth', authRouter)
app.use('/user', authenticationMiddleware, userRouter)
app.use('/categories', categoryRouter)
app.use('/restaurants', restaurantRouter)
app.get('/slugs', async (request, response) => {
  // The type is just inferred from usage
  let slugs: {
    items: {
      slug: string
    }[]
    slug: string
  }[]

  try {
    slugs = await prisma.restaurant.findMany({
      select: {
        slug: true,
        items: {
          select: {
            slug: true,
          },
        },
      },
    })
  } catch (error) {
    console.error(error)
    return response.status(500).json({ message: 'Server error.' })
  }
  return response.json(slugs)
})

app.get('/item', async (request, response) => {
  const { itemSlug } = request.query
  if (!itemSlug) {
    return response.status(400).json({ message: 'Provide itemSlug.' })
  }
  if (typeof itemSlug !== 'string') {
    return response
      .status(400)
      .json({ message: 'itemSlug should be a string.' })
  }

  let nestedItem: NestedItem | null
  try {
    nestedItem = await prisma.item.findUnique({
      where: {
        slug: itemSlug,
      },
      include: {
        options: {
          include: {
            inputs: true,
          },
        },
      },
    })
  } catch (error) {
    console.error(error)
    return response.status(500).json({ message: 'Server error.' })
  }
  return response.json(nestedItem)
})

app.get('/favorited', authenticationMiddleware, async (request, response) => {
  const restaurantId = Number(request.query.restaurantId)
  const { user } = request
  if (!user) {
    return response.status(400).json({
      message: 'Invalid authentication. Please sign out and sign in again.',
    })
  }
  const userId = user.id

  let restaurantUserObject: RestaurantsOnUsers | null
  try {
    restaurantUserObject = await prisma.restaurantsOnUsers.findFirst({
      where: {
        restaurantId,
        userId,
      },
    })
  } catch (error) {
    console.error(error)
    return response.status(500).json({ message: 'Server error.' })
  }

  if (restaurantUserObject) {
    return response.json(true)
  } else {
    return response.json(false)
  }
})

app.post('/favorite', authenticationMiddleware, async (request, response) => {
  const { restaurantId } = request.body
  if (!restaurantId) {
    return response.status(400).json({ message: 'restaurantId is required.' })
  }
  const { user } = request
  if (!user) {
    return response.status(400).json({
      message: 'Invalid authentication. Please sign out and sign in again.',
    })
  }
  const userId = user.id

  try {
    await prisma.restaurantsOnUsers.upsert({
      where: {
        restaurantId_userId: {
          restaurantId,
          userId,
        },
      },
      update: {},
      create: {
        restaurantId,
        userId,
      },
    })
  } catch (error) {
    console.error(error)
    return response.status(500).json({ message: 'Server error.' })
  }
  return response.json({ message: 'Favorited.' })
})

app.delete(
  '/unfavorite',
  authenticationMiddleware,
  async (request, response) => {
    const restaurantId = Number(request.body.restaurantId)
    if (!restaurantId) {
      return response.status(400).json({ message: 'restaurantId is required.' })
    }
    const { user } = request
    if (!user) {
      return response.status(400).json({
        message: 'Invalid authentication. Please sign out and sign in again.',
      })
    }
    const userId = user.id

    try {
      await prisma.restaurantsOnUsers.deleteMany({
        where: {
          restaurantId,
          userId,
        },
      })
    } catch (error) {
      console.error(error)
      return response.status(500).json({ message: 'Server error.' })
    }
    return response.json({ message: 'Unfavorited.' })
  }
)

app.delete('/signout', authenticationMiddleware, async (request, response) => {
  const { user } = request
  if (!user) {
    return response.status(403).json({
      message: 'Invalid session ID. Please try again.',
    })
  }
  const { sessionId } = user

  try {
    await prisma.session.delete({
      where: {
        id: sessionId,
      },
    })
  } catch (error) {
    console.error(error)
    return response
      .status(500)
      .json({ message: 'Database error. Please try again later.' })
  }
  return response.status(204).json({ message: 'Session ID is deleted.' })
})

app.use((request, response) =>
  response.status(404).json({ message: 'Page not found.' })
)

const port = process.env.PORT || 2000
app.listen(port, () => console.log('Server is running on port ' + port))
