import { restaurants } from 'data/restaurants'
import Image from 'next/image'
import { ChangeEvent, useState } from 'react'
import type { AddItem } from 'types/addItem'
import type { Option } from 'types/option'
import Head from './Head'
import Order from './Order'

type ItemProps = {
  restaurantName: string
  itemName: string
  addItem: AddItem
}

const Item = ({ restaurantName, itemName, addItem }: ItemProps) => {
  const restaurant = restaurants.find(({ name }) => name === restaurantName)

  // The following optional chainings should be removed after dynamic route abstraction
  const item = restaurant?.items.find(({ name }) => name === itemName)

  const imageSource = item?.imageSource
  const basePrice = item?.basePrice
  const name = item?.name
  const options = item?.options

  const initialSelectedOptions = options?.map((option) => {
    const name = option.name
    const inputs = option.inputs.filter((input) => input.additionalPrice === 0)
    return { name, inputs }
  })

  const [selectedOptions, setSelectedOptions] = useState<Option[]>(
    initialSelectedOptions ?? []
  )

  // Fix this later
  if (!imageSource || !basePrice || !name || !options) {
    return null
  }

  const inputs = selectedOptions.map((option) => option.inputs).flat()
  const additionalPrices = inputs.map((input) => input.additionalPrice)

  let additionalPrice = 0
  if (additionalPrices.length > 0) {
    additionalPrice = additionalPrices.reduce(
      (previousValue, currentValue) => previousValue + currentValue
    )
  }
  const oneItemPrice = basePrice + additionalPrice

  const eventHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      name: optionName,
      id: inputName,
      value: additionalPrice,
    } = event.target

    const newSelectedOptions: Option[] = selectedOptions.map(
      (selectedOption) => {
        if (selectedOption.name !== optionName) {
          return selectedOption
        } else {
          return {
            name: optionName,
            inputs: [
              {
                name: inputName,
                additionalPrice: Number(additionalPrice),
              },
            ],
          }
        }
      }
    )

    setSelectedOptions(newSelectedOptions)
  }

  return (
    <>
      <Head title={name} />

      <section className='mx-auto flex max-w-md flex-col gap-4'>
        <h1>{name}</h1>
        <div className='max-w-md'>
          <Image alt={name} src={imageSource} placeholder='blur' />
        </div>

        {options.map((option) => {
          return (
            <div key={option.name}>
              <h2>Choose {option.name}</h2>
              {option.inputs.map(({ name, additionalPrice }) => {
                return (
                  <div key={name} className='flex items-center gap-x-4'>
                    <input
                      key={name}
                      name={option.name}
                      id={name}
                      value={additionalPrice}
                      onChange={eventHandler}
                      defaultChecked={additionalPrice === 0 && true}
                      type='radio'
                    />
                    <label htmlFor={name}>{name}</label>
                    <div>+${additionalPrice}</div>
                  </div>
                )
              })}
            </div>
          )
        })}

        <Order
          item={item}
          oneItemPrice={oneItemPrice}
          addItem={addItem}
          inputs={inputs}
        />
      </section>
    </>
  )
}

export default Item
