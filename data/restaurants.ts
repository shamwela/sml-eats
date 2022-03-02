import BBQPorkDeluxeImage from 'public/images/bbq-pork-deluxe.jpeg'
import IcedCoffeeImage from 'public/images/iced-coffee.webp'
import ButterCroissantImage from 'public/images/butter-croissant.webp'
import type { Restaurant } from 'types/restaurant'
import SeafoodCocktailImage from 'public/images/seafood-cocktail.jpeg'
import StarbucksImage from 'public/images/starbucks.webp'
import ThePizzaCompanyImage from 'public/images/the-pizza-company.webp'
import { pizzaOptions } from './pizzaOptions'
import { coffeeOptions } from './coffeeOptions'

export const restaurants: Restaurant[] = [
  {
    name: 'The Pizza Company',
    slug: 'the-pizza-company',
    category: 'Pizza',
    rating: 4.9,
    imageSource: ThePizzaCompanyImage,
    deliveryTime: 30,
    deliveryFee: 2,
    items: [
      {
        name: 'Seafood Cocktail',
        slug: 'seafood-cocktail',
        slugs: ['the-pizza-company', 'seafood-cocktail'],
        path: '/restaurants/the-pizza-company/seafood-cocktail',
        imageSource: SeafoodCocktailImage,
        description:
          'Ingredients: pineapple, ham, fresh shrimp, crab sticks, thousand island sauce, and fresh prawns.',
        category: 'Pizza',
        basePrice: 20,
        options: pizzaOptions,
      },
      {
        name: 'BBQ Pork Deluxe',
        slug: 'bbq-pork-deluxe',
        slugs: ['the-pizza-company', 'bbq-pork-deluxe'],
        path: '/restaurants/the-pizza-company/bbq-pork-deluxe',
        imageSource: BBQPorkDeluxeImage,
        description:
          'Ingredients: pork, onion, BBQ sauce, green capsicums, red capsicum, italian sausage.',
        category: 'Pizza',
        basePrice: 15,
        options: pizzaOptions,
      },
    ],
  },
  {
    name: 'Starbucks',
    slug: 'starbucks',
    category: 'Coffee',
    rating: 4.8,
    imageSource: StarbucksImage,
    deliveryTime: 20,
    deliveryFee: 1,
    items: [
      {
        name: 'Butter Croissant',
        slug: 'buttter-croissant',
        slugs: ['starbucks', 'butter-croissant'],
        path: '/restaurants/starbucks/butter-croissant',
        imageSource: ButterCroissantImage,
        description:
          'Classic butter croissant with soft, flaky layers and a golden-brown crust.',
        category: 'pastry',
        basePrice: 4,
      },
      {
        name: 'Iced Coffee',
        slug: 'iced-coffee',
        slugs: ['starbucks', 'iced-coffee'],
        path: '/restaurants/starbucks/iced-coffee',
        imageSource: IcedCoffeeImage,
        description:
          'Freshly brewed Starbucks Iced Coffee Blend served chilled and sweetened over ice. An absolutely, seriously, refreshingly lift to any day.',
        category: 'coffee',
        basePrice: 4,
        options: coffeeOptions,
      },
    ],
  },
]
