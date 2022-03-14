import { restaurants } from 'data/restaurants'
import type { AddItem } from 'types/addItem'
import type { Item } from 'types/item'
import Image from 'next/image'
import { ChangeEvent, useState } from 'react'
import type { Option } from 'types/option'
import Head from 'components/Head'
import Order from 'components/Order'
import type { GetStaticPaths } from 'next'

export const getStaticPaths: GetStaticPaths = () => {
  // This type is just inferred from usage. Don't worry.
  let paths: { params: { slug: string[] } }[] = []

  restaurants.forEach((restaurant) => {
    restaurant.items.forEach((item) => {
      const slugArray = [restaurant.slug, item.slug]

      const path = {
        params: {
          slug: slugArray,
        },
      }

      paths.push(path)
    })
  })

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = (context: { params: { slug: string[] } }) => {
  const items = restaurants.map((restaurant) => restaurant.items).flat()

  // For example, ['the-pizza-company', 'seafood-cocktail']
  const currentSlugArray = context.params.slug
  const item = items.find(
    ({ slug }) => slug === currentSlugArray[currentSlugArray.length - 1]
  )

  return {
    props: {
      item,
    },
  }
}

type ItemPageProps = {
  item: Item
  addItem: AddItem
}

const ItemPage = ({ item, addItem }: ItemPageProps) => {
  const { imageSource, description, basePrice, name } = item
  const options = item.options ?? []

  const initialSelectedOptions: Option[] = options.map((option) => {
    const name = option.name

    // Items with zero additional price should be the initial selected options
    const inputs = option.inputs.filter((input) => input.additionalPrice === 0)
    return { name, inputs }
  })

  const [selectedOptions, setSelectedOptions] = useState(initialSelectedOptions)

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
        <div className='max-w-md'>
          <Image alt={name} src={imageSource} placeholder='blur' />
        </div>
        <h1>{name}</h1>
        <span>{description}</span>
        <span>Base price: ${basePrice}</span>

        {options.map((option) => {
          return (
            <div key={option.name} className='flex flex-col gap-4'>
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
                    <label htmlFor={name} className='mr-auto'>
                      {name}
                    </label>
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
          selectedOptions={selectedOptions}
        />
      </section>
    </>
  )
}

export default ItemPage
