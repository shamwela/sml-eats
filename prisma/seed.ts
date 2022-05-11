import { PrismaClient } from '@prisma/client'
import { categories, restaurants } from './data'

const prisma = new PrismaClient()

const load = async () => {
  try {
    await prisma.category.deleteMany()
    console.log('Deleted records in category table')

    await prisma.restaurant.deleteMany()
    console.log('Deleted records in restaurant table')

    await prisma.$queryRaw`ALTER TABLE Category AUTO_INCREMENT = 1`
    console.log('reset product auto increment to 1')

    await prisma.$queryRaw`ALTER TABLE Restaurant AUTO_INCREMENT = 1`
    console.log('reset category auto increment to 1')

    await prisma.category.createMany({
      data: categories,
    })
    console.log('Added category data')

    await prisma.restaurant.createMany({
      data: restaurants,
    })
  } catch (e) {
    console.error(e)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

load()
