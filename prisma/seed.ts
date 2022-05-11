import { PrismaClient } from '@prisma/client'
import { categories, inputs, options, items, restaurants } from './data'

const prisma = new PrismaClient()

const deleteData = async () => {
  await prisma.category.deleteMany()
  await prisma.input.deleteMany()
  await prisma.option.deleteMany()
  await prisma.item.deleteMany()
  await prisma.restaurant.deleteMany()
}

const resetAutoIncrement = async () => {
  await prisma.$queryRaw`alter table Category auto_increment = 1`
  await prisma.$queryRaw`alter table Input auto_increment = 1`
  await prisma.$queryRaw`alter table Option auto_increment = 1`
  await prisma.$queryRaw`alter table Item auto_increment = 1`
  await prisma.$queryRaw`alter table Restaurant auto_increment = 1`
}

const seed = async () => {
  await prisma.category.createMany({ data: categories })
  await prisma.input.createMany({ data: inputs })
  await prisma.option.createMany({ data: options })
  await prisma.item.createMany({ data: items })
  await prisma.restaurant.createMany({ data: restaurants })
}

const main = async () => {
  try {
    deleteData()
    resetAutoIncrement()
    seed()
  } catch (error) {
    console.error(error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}
main()
