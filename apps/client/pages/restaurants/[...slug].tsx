import { useState } from 'react'
import Head from 'components/Head'
import Order from 'components/Order'
import type { Input } from 'types/input'
import Image from 'next/image'
import type { NestedItem } from 'types/nestedItem'
import axios from 'utilities/axios'
import type { nestedSlug } from 'types/nestedSlug'

export const getStaticPaths = async () => {
  const slugResponse = await axios.get('/slugs')
  // This type is copied from the API
  const slugs: nestedSlug[] = slugResponse.data

  const paths = slugs
    .map((restaurant) => {
      return restaurant.items.map((item) => {
        // For example, ['the-pizza-company', 'seafood-cocktail']
        const slugArray = [restaurant.slug, item.slug]
        const path = {
          params: {
            slug: slugArray,
          },
        }
        return path
      })
    })
    .flat()

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async (context: {
  params: { slug: string[] }
}) => {
  // For example, ['the-pizza-company', 'seafood-cocktail']
  const slugArray = context.params.slug
  // For example, 'seafood-cocktail'
  const itemSlug = slugArray[1]
  const itemResponse = await axios.get('/item', {
    params: { itemSlug },
  })
  const item: NestedItem = itemResponse.data

  return {
    props: {
      item,
    },
  }
}

const ItemPage = ({ item }: { item: NestedItem }) => {
  const {
    imageSource,
    imageWidth,
    imageHeight,
    description,
    basePrice,
    name,
    options,
  } = item

  const initialOptions = options.map((option) => {
    // Items with zero additional price should be initially selected
    const initialInputs = option.inputs.filter(
      (input) => input.additionalPrice === 0
    )
    const initialOption = { ...option, inputs: initialInputs }
    return initialOption
  })

  const [selectedOptions, setSelectedOptions] = useState(initialOptions)

  const inputs = selectedOptions.map((option) => option.inputs).flat()
  const additionalPrices = inputs.map((input) => input.additionalPrice)

  let additionalPrice = 0
  if (additionalPrices.length > 0) {
    additionalPrice = additionalPrices.reduce(
      (previousValue, currentValue) => previousValue + currentValue
    )
  }
  const oneItemPrice = basePrice + additionalPrice

  const handleInput = (optionName: string, newInput: Input) => {
    const newSelectedOptions = selectedOptions.map((selectedOption) => {
      // For example, Size, Crust
      if (selectedOption.name === optionName) {
        // Change the selected input
        const newSelectedOption = { ...selectedOption, inputs: [newInput] }
        return newSelectedOption
      } else {
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
        <span>
          {/* If there are options to select, it should be called "Base price" */}
          {options.length > 0 && 'Base price: '}${basePrice}
        </span>
        <span>{description}</span>

        {options.map((option) => {
          const { id, name, inputs } = option

          return (
            <div key={id} className='flex flex-col gap-4'>
              <h2>Choose {name}</h2>
              {inputs.map((input) => {
                const { id, name, additionalPrice } = input
                return (
                  <div key={id} className='flex items-center gap-x-4'>
                    <input
                      id={name}
                      name={option.name}
                      value={additionalPrice}
                      onChange={() => handleInput(option.name, input)}
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
          selectedOptions={selectedOptions}
        />
      </section>
    </>
  )
}

export default ItemPage
