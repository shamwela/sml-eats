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
  // Coffee inputs
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
  // Seafood Cocktail crust inputs
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
  // Seafood cocktail size inputs
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
  // BBQ Pork Deluxe crust inputs
  {
    name: 'Crispy Thin',
    additionalPrice: 0,
    optionId: 4,
  },
  {
    name: 'Pan',
    additionalPrice: 2,
    optionId: 4,
  },
  {
    name: 'Extra Cheesy Sausage Bites',
    additionalPrice: 3,
    optionId: 4,
  },
  {
    name: 'Extreme',
    additionalPrice: 3,
    optionId: 4,
  },
  // BBQ Pork Deluxe size inputs
  {
    name: 'Small',
    additionalPrice: 0,
    optionId: 5,
  },
  {
    name: 'Medium',
    additionalPrice: 2,
    optionId: 5,
  },
  {
    name: 'Large',
    additionalPrice: 4,
    optionId: 5,
  },
]

export const options: Prisma.OptionCreateManyInput[] = [
  // Coffee size
  {
    name: 'Size',
    itemId: 4,
  },
  // Seafood Cocktail crust
  {
    name: 'Crust',
    itemId: 1,
  },
  // Seafood Cocktail size
  {
    name: 'Size',
    itemId: 1,
  },
  // BBQ Pork Deluxe crust
  {
    name: 'Crust',
    itemId: 2,
  },
  // BBQ Pork Deluxe size
  {
    name: 'Size',
    itemId: 2,
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
  {
    name: 'Butter Croissant',
    slug: 'butter-croissant',
    path: '/restaurants/starbucks/butter-croissant',
    imageSource: '/images/butter-croissant.webp',
    imageWidth: 550,
    imageHeight: 550,
    description:
      'Classic butter croissant with soft, flaky layers and a golden-brown crust.',
    categoryId: 4,
    basePrice: 4,
    restaurantId: 2,
  },
  {
    name: 'Iced Coffee',
    slug: 'iced-coffee',
    path: '/restaurants/starbucks/iced-coffee',
    imageSource: '/images/iced-coffee.webp',
    imageWidth: 550,
    imageHeight: 550,
    description:
      'Freshly brewed Starbucks Iced Coffee Blend served chilled and sweetened over ice. An absolutely, seriously, refreshingly lift to any day.',
    categoryId: 2,
    basePrice: 4,
    restaurantId: 2,
  },
  {
    name: 'Oven Roasted Turkey Footlong Regular Sub',
    slug: 'oven-roasted-turkey-footlong-regular-sub',
    path: '/restaurants/subway/oven-roasted-turkey-footlong-regular-sub',
    imageSource: '/images/oven-roasted-turkey-footlong-regular-sub.webp',
    imageWidth: 660,
    imageHeight: 440,
    description:
      'If a classic is what you crave, our thin-sliced Oven Roasted Turkey is the sandwich for you. It’s full of flavor and made to order with your choice of crisp veggies, served on our freshly baked, Hearty Multigrain bread.',
    categoryId: 3,
    basePrice: 10,
    restaurantId: 3,
  },
  {
    name: 'Steak & Cheese Footlong Regular Sub',
    slug: 'steak-&-cheese-footlong-regular-sub',
    path: '/restaurants/subway/steak-&-cheese-footlong-regular-sub',
    imageSource: '/images/steak-&-cheese-footlong-regular-sub.webp',
    imageWidth: 660,
    imageHeight: 440,
    description:
      'Our Steak & Cheese sandwich is where warm, delicious steak gets topped with melty cheesiness.',
    categoryId: 3,
    basePrice: 11,
    restaurantId: 3,
  },
  {
    name: '1 Scoop Sundae',
    slug: '1-scoop-sundae',
    path: '/restaurants/baskin-robbins/1-scoop-sundae',
    imageSource: '/images/1-scoop-sundae.webp',
    imageWidth: 550,
    imageHeight: 440,
    description:
      'A 2.5 oz. scoop of ice cream topped with chopped almonds, and a cherry. Delivered products will not include whipped cream.',
    categoryId: 4,
    basePrice: 5,
    restaurantId: 4,
  },
  {
    name: '2 Scoop Sundae',
    slug: '2-scoop-sundae',
    path: '/restaurants/baskin-robbins/2-scoop-sundae',
    imageSource: '/images/2-scoop-sundae.webp',
    imageWidth: 550,
    imageHeight: 440,
    description:
      'Two 2.5 oz. scoops of ice cream topped with chopped almonds, and a cherry. Delivered products will not include whipped cream.',
    categoryId: 4,
    basePrice: 7,
    restaurantId: 4,
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
  {
    name: 'Subway',
    slug: 'subway',
    categoryId: 3,
    rating: 4.8,
    imageSource: '/images/subway.webp',
    imageWidth: 550,
    imageHeight: 440,
  },
  {
    name: 'Baskin-Robbins',
    slug: 'baskin-robbins',
    categoryId: 4,
    rating: 4.3,
    imageSource: '/images/baskin-robbins.webp',
    imageWidth: 550,
    imageHeight: 440,
  },
]
