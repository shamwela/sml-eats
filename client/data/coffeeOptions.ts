import type { Option } from 'types/option'

export const coffeeOptions: Option[] = [
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
      {
        name: 'Large',
        additionalPrice: 4,
      },
    ],
  },
]
