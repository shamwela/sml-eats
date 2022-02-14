import { ChangeEvent, useEffect, useState } from 'react'

import Close from 'ui/Close'
import Head from 'components/Head'
import Image from 'next/image'
import Link from 'next/link'
import type { Restaurant } from 'types/restaurant'
import { restaurants } from 'data/restaurants'
import { useRouter } from 'next/router'

const Search = () => {
  const router = useRouter()
  let query = ''
  if (typeof router.query.query === 'string') {
    query = router.query.query
  }

  const [results, setResults] = useState<Restaurant[]>([])

  useEffect(() => {
    const getResults = () => {
      const matchedRestaurants = restaurants.filter((restaurant) => {
        const { name, category } = restaurant

        const matchesName = name.toLowerCase().includes(query.toLowerCase())
        const matchesCategory = category
          .toLowerCase()
          .includes(query.toLowerCase())

        if (matchesName || matchesCategory) {
          return restaurant
        }
      })

      const finalRestaurants = matchedRestaurants.filter((restaurant) => {
        const { items } = restaurant

        const matchedItems = items.filter((item) => {
          const { name, category } = item

          const matchesName = name.toLowerCase().includes(query.toLowerCase())
          const matchesCategory = category
            .toLowerCase()
            .includes(query.toLowerCase())

          if (matchesName || matchesCategory) {
            return item
          }
        })

        return matchedItems
      })

      return finalRestaurants
    }

    // If there's no query, don't show any results
    if (query === '') {
      setResults([])
    } else {
      const results = getResults()
      setResults(results)
    }
  }, [query])

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value
    router.push({
      pathname: '/search',
      query: { query },
    })
  }

  return (
    <>
      <Head
        title='Search'
        description='Search on SML Eats'
        imageUrl='/images/seafood-cocktail.jpeg'
      />

      <section className='flex flex-col gap-y-4'>
        <Close />
        <h1>Search</h1>

        {/* The user can search by restaurant name, item name, or category */}
        <input
          value={query}
          onChange={handleQueryChange}
          name='query'
          type='search'
          aria-label='Search'
          placeholder='Pizza, coffee, etc'
          autoComplete='false'
          required
        />

        <section className='grid md:grid-cols-4'>
          {results.map(({ name, path, imageSource, category, items }) => (
            <section key={path} className='flex flex-col gap-2'>
              <Link href={path}>
                <a>
                  <section className='flex flex-col'>
                    <Image alt={name} src={imageSource} placeholder='blur' />
                    <span className='font-bold'>{name}</span>
                    <span>{category}</span>
                  </section>
                </a>
              </Link>

              <section className='flex gap-x-4'>
                {items.map(({ imageSource, name, basePrice, path }) => (
                  <Link key={path} href={path}>
                    <a>
                      <section className='flex flex-col rounded-custom bg-light-primary p-4 shadow-lg'>
                        <Image
                          alt={name}
                          src={imageSource}
                          placeholder='blur'
                        />
                        <span>{name}</span>
                        <span>${basePrice}</span>
                      </section>
                    </a>
                  </Link>
                ))}
              </section>
            </section>
          ))}
        </section>
      </section>
    </>
  )
}

export default Search
