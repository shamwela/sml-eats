import IcedCoffeeImage from 'public/images/iced-coffee.webp'
import ButterCroissantImage from 'public/images/butter-croissant.webp'
import SubwayImage from 'public/images/subway.webp'
import OvenRoastedTurkeyFootlongRegularSubImage from 'public/images/oven-roasted-turkey-footlong-regular-sub.webp'
import SteakAndCheeseFootlongRegularSubImage from 'public/images/steak-&-cheese-footlong-regular-sub.webp'
import BaskinRobbinsImage from 'public/images/baskin-robbins.webp'
import OneScoopSundaeImage from 'public/images/1-scoop-sundae.webp'
import TwoScoopSundaeImage from 'public/images/2-scoop-sundae.webp'

const restaurants = [
  {
    items: [
      {
        name: 'Butter Croissant',
        slug: 'butter-croissant',
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
        path: '/restaurants/starbucks/iced-coffee',
        imageSource: IcedCoffeeImage,
        description:
          'Freshly brewed Starbucks Iced Coffee Blend served chilled and sweetened over ice. An absolutely, seriously, refreshingly lift to any day.',
        category: 'coffee',
        basePrice: 4,
        // options: coffeeOptions,
      },
    ],
  },
  {
    name: 'Subway',
    slug: 'subway',
    category: 'Fast food',
    rating: 4.8,
    imageSource: SubwayImage,
    items: [
      {
        name: 'Oven Roasted Turkey Footlong Regular Sub',
        slug: 'oven-roasted-turkey-footlong-regular-sub',
        path: '/restaurants/subway/oven-roasted-turkey-footlong-regular-sub',
        imageSource: OvenRoastedTurkeyFootlongRegularSubImage,
        description:
          'If a classic is what you crave, our thin-sliced Oven Roasted Turkey is the sandwich for you. It’s full of flavor and made to order with your choice of crisp veggies, served on our freshly baked, Hearty Multigrain bread.',
        category: 'Fast food',
        basePrice: 10,
      },
      {
        name: 'Steak & Cheese Footlong Regular Sub',
        slug: 'steak-&-cheese-footlong-regular-sub',
        path: '/restaurants/subway/steak-&-cheese-footlong-regular-sub',
        imageSource: SteakAndCheeseFootlongRegularSubImage,
        description:
          'Our Steak & Cheese sandwich is where warm, delicious steak gets topped with melty cheesiness.',
        category: 'Fast food',
        basePrice: 11,
      },
    ],
  },
  {
    name: 'Baskin-Robbins',
    slug: 'baskin-robbins',
    category: 'Dessert',
    rating: 4.3,
    imageSource: BaskinRobbinsImage,
    items: [
      {
        name: '1 Scoop Sundae',
        slug: '1-scoop-sundae',
        path: '/restaurants/baskin-robbins/1-scoop-sundae',
        imageSource: OneScoopSundaeImage,
        description:
          'Your choice of a 2.5 oz. scoop of ice cream topped with your choice of wet topping, chopped almonds, and a cherry. Delivered products will not include whipped cream.',
        category: 'Dessert',
        basePrice: 5,
      },
      {
        name: '2 Scoop Sundae',
        slug: '2-scoop-sundae',
        path: '/restaurants/baskin-robbins/2-scoop-sundae',
        imageSource: TwoScoopSundaeImage,
        description:
          'Your choice of 2-2.5 oz. scoops of ice cream topped with your choice of wet topping, chopped almonds, and a cherry. Delivered products will not include whipped cream.',
        category: 'Dessert',
        basePrice: 7,
      },
    ],
  },
]
