import BBQPorkDeluxeImage from 'public/images/bbq-pork-deluxe.jpeg'
import IcedCoffeeImage from 'public/images/iced-coffee.png'
import IrishCreamColdBrewImage from 'public/images/irish-cream-cold-brew.png'
import type { Restaurant } from 'types/restaurant'
import SeafoodCocktailImage from 'public/images/seafood-cocktail.jpeg'
import StarbucksImage from 'public/images/starbucks.webp'
import ThePizzaCompanyImage from 'public/images/the-pizza-company.webp'

export const restaurants: Restaurant[] = [
  {
    name: 'The Pizza Company',
    slug: 'the-pizza-company',
    path: '/restaurants/the-pizza-company',
    category: 'Pizza',
    rating: 4.9,
    imageSource: ThePizzaCompanyImage,
    location:
      'No. (359/363), ground floor, corner of 31th street & Bo Gyoke Aung San Road, Yangon',
    items: [
      {
        name: 'Seafood Cocktail',
        slug: 'seafood-cocktail',
        path: '/restaurants/the-pizza-company/seafood-cocktail',
        imageSource: SeafoodCocktailImage,
        category: 'Pizza',
        deliveryFee: 0,
        deliveryTime: 30,
        basePrice: 20,
        options: [],
      },
      {
        name: 'BBQ Pork Deluxe',
        slug: 'bbq-pork-deluxe',
        path: '/restaurants/the-pizza-company/bbq-pork-deluxe',
        imageSource: BBQPorkDeluxeImage,
        category: 'Pizza',
        deliveryFee: 0,
        deliveryTime: 30,
        basePrice: 15,
        options: [],
      },
    ],
  },
  {
    name: 'Starbucks',
    slug: 'starbucks',
    path: '/restaurants/starbucks',
    category: 'Coffee',
    rating: 4.8,
    imageSource: StarbucksImage,
    location: 'Imaginary Street, Yangon',
    items: [
      {
        name: 'Irish Cream Cold Brew',
        slug: 'irish-cream-cold-brew',
        path: '/restaurants/starbucks/irish-cream-cold-brew',
        imageSource: IrishCreamColdBrewImage,
        category: 'coffee',
        deliveryFee: 0,
        deliveryTime: 15,
        basePrice: 20,
        options: [],
      },
      {
        name: 'Iced Coffee',
        slug: 'iced-coffee',
        path: '/restaurants/starbucks/iced-coffee',
        imageSource: IcedCoffeeImage,
        category: 'coffee',
        deliveryFee: 0,
        deliveryTime: 15,
        basePrice: 20,
        options: [
          {
            name: 'Size',
            inputs: [
              {
                name: 'Small',
                additionalPrice: 0,
              },
              {
                name: 'Medium',
                additionalPrice: 2,
              },
            ],
          },
          {
            name: 'Size',
            inputs: [
              {
                name: 'Small',
                additionalPrice: 0,
              },
              {
                name: 'Medium',
                additionalPrice: 2,
              },
            ],
          },
        ],
      },
    ],
  },
]
