import { Prisma } from '@prisma/client'

export const categories: Prisma.CategoryCreateInput[] = [
  {
    name: 'Pizza',
    imageSource: '/images/pizza.png',
    imageWidth: 144,
    imageHeight: 168,
  },
  {
    name: 'Coffee',
    imageSource: '/images/coffee.png',
    imageWidth: 147,
    imageHeight: 168,
  },
  {
    name: 'Fast food',
    imageSource: '/images/fast-food.png',
    imageWidth: 144,
    imageHeight: 168,
  },
  {
    name: 'Dessert',
    imageSource: '/images/dessert.png',
    imageWidth: 144,
    imageHeight: 168,
  },
]

export const restaurants = [
  {
    name: 'The Pizza Company',
    slug: 'the-pizza-company',
    categoryId: 1,
    rating: 4.9,
    imageSource: '/images/the-pizza-company.webp',
    imageWidth: 550,
    imageHeight: 440,
  },
]
