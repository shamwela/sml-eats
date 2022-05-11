import { PrismaClient } from '@prisma/client'
import { categories, inputs, options, restaurants } from './data'

const prisma = new PrismaClient()

const load = async () => {
  try {
    await prisma.category.deleteMany()
    await prisma.input.deleteMany()
    await prisma.option.deleteMany()
    await prisma.restaurant.deleteMany()

    // Reset auto increment to 1
    await prisma.$queryRaw`alter table Category auto_increment = 1`
    await prisma.$queryRaw`alter table Input auto_increment = 1`
    await prisma.$queryRaw`alter table Option auto_increment = 1`
    await prisma.$queryRaw`alter table Restaurant auto_increment = 1`

    await prisma.category.createMany({
      data: categories,
    })
    await prisma.input.createMany({
      data: inputs,
    })
    await prisma.option.createMany({
      data: options,
    })
    await prisma.restaurant.createMany({
      data: restaurants,
    })
  } catch (error) {
    console.error(error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

load()
