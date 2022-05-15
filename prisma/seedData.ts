import { Prisma } from '@prisma/client'

export const categories: Prisma.CategoryCreateManyInput[] = [
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

export const inputs: Prisma.InputCreateManyInput[] = [
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

export const options: Prisma.OptionCreateManyInput[] = [
  // The first option is Coffee Size, the last option is Pizza Size
  // A better way should be used later
  {
    name: 'Size',
  },
  {
    name: 'Crust',
    itemId: 1,
  },
  {
    // Pizza Size
    name: 'Size',
    itemId: 1,
  },
]

export const items: Prisma.ItemCreateManyInput[] = [
  {
    name: 'Seafood Cocktail',
    slug: 'seafood-cocktail',
    path: '/restaurants/the-pizza-company/seafood-cocktail',
    imageSource: '/images/seafood-cocktail.jpeg',
    imageWidth: 1016,
    imageHeight: 934,
    description:
      'Ingredients: pineapple, ham, fresh shrimp, crab sticks, thousand island sauce, and fresh prawns.',
    categoryId: 1,
    basePrice: 20,
    restaurantId: 1,
  },
  {
    name: 'BBQ Pork Deluxe',
    slug: 'bbq-pork-deluxe',
    path: '/restaurants/the-pizza-company/bbq-pork-deluxe',
    imageSource: '/images/bbq-pork-deluxe.jpeg',
    imageWidth: 1016,
    imageHeight: 934,
    description:
      'Ingredients: pork, onion, BBQ sauce, green capsicums, red capsicum, italian sausage.',
    categoryId: 1,
    basePrice: 15,
    restaurantId: 1,
  },
]

export const restaurants: Prisma.RestaurantCreateManyInput[] = [
  {
    name: 'The Pizza Company',
    slug: 'the-pizza-company',
    categoryId: 1,
    rating: 4.9,
    imageSource: '/images/the-pizza-company.webp',
    imageWidth: 550,
    imageHeight: 440,
  },
  {
    name: 'Starbucks',
    slug: 'starbucks',
    categoryId: 2,
    rating: 4.8,
    imageSource: '/images/starbucks.webp',
    imageWidth: 550,
    imageHeight: 440,
  },
]
