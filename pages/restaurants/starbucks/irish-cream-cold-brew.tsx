import { ChangeEvent, useState } from 'react'
import Head from 'components/Head'
import Image from 'next/image'
import type { Item } from 'types/item'
import Order from 'components/Order'
import { restaurants } from 'data/restaurants'
import ItemLayout from 'layouts/Item'
import { sizes } from 'data/coffee'
import type { AddItem } from 'types/addItem'

type IrishCreamColdBrewProps = {
  addItem: AddItem
}

const IrishCreamColdBrew = ({ addItem }: IrishCreamColdBrewProps) => {
  const starbucks = restaurants.find(
    (restaurant) => restaurant.slug === 'starbucks'
  )
  const irishCreamColdBrew = starbucks?.items.find(
    (item) => item.slug === 'irish-cream-cold-brew'
  ) as Item
  const imageSource = irishCreamColdBrew?.imageSource || ''
  const { basePrice } = irishCreamColdBrew
  const [sizePrice, setSizePrice] = useState(0)
  const oneItemPrice = basePrice + sizePrice

  const handleSizePrice = (event: ChangeEvent<HTMLInputElement>) => {
    const sizePrice = Number(event.target.value)
    setSizePrice(sizePrice)
  }

  return (
    <>
      <Head
        title='Irish Cream Cold Brew'
        imageUrl='/images/irish-cream-cold-brew.png'
      />

      <ItemLayout>
        <h1>Irish Cream Cold Brew</h1>
        <div className='max-w-md'>
          <Image
            alt='Irish Cream Cold Brew'
            src={imageSource}
            placeholder='blur'
          />
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
          item={irishCreamColdBrew}
          oneItemPrice={oneItemPrice}
          addItem={addItem}
          inputs={[]}
        />
      </ItemLayout>
    </>
  )
}

export default IrishCreamColdBrew
