import type { AddItem } from 'types/addItem'
import { ChangeEvent, useState } from 'react'
import Head from 'components/Head'
import Order from 'components/Order'
import { Item, Option, Input, PrismaClient } from '@prisma/client'
import Image from 'next/image'

const prisma = new PrismaClient()

export const getStaticPaths = async () => {
  // This type is just inferred from usage. Don't worry.
  let paths: { params: { slug: string[] } }[] = []
  const restaurants = await prisma.restaurant.findMany({
    include: { items: true },
  })
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

export const getStaticProps = async (context: {
  params: { slug: string[] }
}) => {
  const restaurants = await prisma.restaurant.findMany({
    include: {
      items: {
        include: {
          options: {
            include: {
              inputs: true,
            },
          },
        },
      },
    },
  })
  const items = restaurants.map((restaurant) => restaurant.items).flat()

  // For example, ['the-pizza-company', 'seafood-cocktail']
  const currentSlugArray = context.params.slug
  const item = items.find(
    ({ slug }) => slug === currentSlugArray[currentSlugArray.length - 1]
  )
  console.log(item.options[0].inputs)

  return {
    props: {
      item,
    },
  }
}

const ItemPage = ({
  item,
  addItem,
}: {
  // This type is inferred from the return value of getStaticProps
  item: Item & {
    options: (Option & {
      inputs: Input[]
    })[]
  }
  addItem: AddItem
}) => {
  const {
    imageSource,
    imageWidth,
    imageHeight,
    description,
    basePrice,
    name,
    options,
  } = item
  console.log(options[0].inputs)

  const initialSelectedOptions = options.map((option) => {
    // Items with zero additional price should be the initial selected options
    const inputs = option.inputs.filter((input) => input.additionalPrice === 0)
    option.inputs = inputs
    return option
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
    const { name: optionName } = event.target

    const newSelectedOptions = selectedOptions.map((selectedOption) => {
      if (selectedOption.name !== optionName) {
        return selectedOption
      } else {
        selectedOption.name = optionName
        return selectedOption
      }
    })

    setSelectedOptions(newSelectedOptions)
  }

  return (
    <>
      <Head title={name} />

      <section className='mx-auto flex max-w-md flex-col gap-4'>
        <div className='max-w-md'>
          <Image
            alt={name}
            src={imageSource}
            width={imageWidth}
            height={imageHeight}
          />
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
