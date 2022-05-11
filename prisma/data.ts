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

export const inputs = [
  // Coffee inputs, not pizza inputs
  {
    name: 'Small',
    additionalPrice: 0,
    optionId: 1,
  },
  {
    name: 'Medium',
    additionalPrice: 2,
    optionId: 1,
  },
  {
    name: 'Large',
    additionalPrice: 4,
    optionId: 1,
  },
  {
    name: 'Crispy Thin',
    additionalPrice: 0,
    optionId: 2,
  },
  {
    name: 'Pan',
    additionalPrice: 2,
    optionId: 2,
  },
  {
    name: 'Extra Cheesy Sausage Bites',
    additionalPrice: 3,
    optionId: 2,
  },
  {
    name: 'Extreme',
    additionalPrice: 3,
    optionId: 2,
  },
  {
    name: 'Small',
    additionalPrice: 0,
    optionId: 3,
  },
  {
    name: 'Medium',
    additionalPrice: 3,
    optionId: 3,
  },
  {
    name: 'Large',
    additionalPrice: 5,
    optionId: 3,
  },
]

export const options: Prisma.OptionCreateInput[] = [
  // The first option is Coffee Size, the last option is Pizza Size
  // A better way should be used later
  {
    name: 'Size',
  },
  {
    name: 'Crust',
  },
  {
    name: 'Size',
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
