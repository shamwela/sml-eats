import type { Option } from 'types/option'

export const pizzaOptions: Option[] = [
  {
    name: 'Crust',
    inputs: [
      {
        name: 'Crispy Thin',
        additionalPrice: 0,
      },
      {
        name: 'Pan',
        additionalPrice: 2,
      },
      {
        name: 'Extra Cheesy Sausage Bites',
        additionalPrice: 3,
      },
      {
        name: 'Extreme',
        additionalPrice: 3,
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
        additionalPrice: 3,
      },
      {
        name: 'Large',
        additionalPrice: 5,
      },
    ],
  },
]
