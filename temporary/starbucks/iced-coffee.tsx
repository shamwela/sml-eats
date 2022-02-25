import { ChangeEvent, useState } from 'react'
import Head from 'components/Head'
import Image from 'next/image'
import type { Item } from 'types/item'
import Order from 'components/Order'
import { restaurants } from 'data/restaurants'
import ItemLayout from 'layouts/Item'
import { sizes } from 'data/coffee'
import type { AddItem } from 'types/addItem'

type IcedCoffeeProps = {
  addItem: AddItem
}

const IcedCoffee = ({ addItem }: IcedCoffeeProps) => {
  const starbucks = restaurants.find(
    (restaurant) => restaurant.slug === 'starbucks'
  )
  const icedCoffee = starbucks?.items.find(
    (item) => item.slug === 'iced-coffee'
  ) as Item
  const imageSource = icedCoffee?.imageSource || ''
  const { basePrice } = icedCoffee
  const [sizePrice, setSizePrice] = useState(0)
  const oneItemPrice = basePrice + sizePrice

  const [selectedOptions, setSelectedOptions] = useState([
    {
      name: 'Size',
      value: 'Small',
      additionalPrice: 0,
    },
  ])

  const handleSizePrice = (event: ChangeEvent<HTMLInputElement>) => {
    const sizePrice = Number(event.target.value)
    setSizePrice(sizePrice)

    const selectedOptions = [
      {
        name: 'Size',
        value: event.target.id,
        additionalPrice: sizePrice,
      },
    ]
    setSelectedOptions(selectedOptions)
  }

  return (
    <>
      <Head title='Iced Coffee' imageUrl='/images/iced-coffee.png' />

      <ItemLayout>
        <h1>Iced Coffee</h1>
        <div className='max-w-md'>
          <Image alt='Iced Coffee' src={imageSource} placeholder='blur' />
        </div>
        <h2>Choose size</h2>
        {sizes.map(
          ({
            name,
            additionalPrice,
          }: {
            name: string
            additionalPrice: number
          }) => {
            return (
              <div key={name} className='flex items-center gap-x-4'>
                <input
                  name='size'
                  type='radio'
                  id={name}
                  value={additionalPrice}
                  onChange={handleSizePrice}
                  defaultChecked={additionalPrice === 0 && true}
                />
                <label htmlFor={name}>{name}</label>
                <div>+${additionalPrice}</div>
              </div>
            )
          }
        )}

        <Order
          item={icedCoffee}
          oneItemPrice={oneItemPrice}
          addItem={addItem}
          inputs={selectedOptions}
        />
      </ItemLayout>
    </>
  )
}

export default IcedCoffee
