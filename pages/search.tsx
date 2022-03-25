import { useEffect, useState } from 'react'
import type { ChangeEvent } from 'react'
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
    query = router.query.query.trim()
  }
  const [results, setResults] = useState<Restaurant[]>([])

  useEffect(() => {
    // If there's no query, don't show any results
    if (query === '') {
      setResults([])
      return
    }

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

    const finalRestaurants = matchedRestaurants.filter(({ items }) => {
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

    setResults(finalRestaurants)
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
      <Head title='Search' />

      <h1>Search</h1>

      <input
        value={query}
        onChange={handleQueryChange}
        type='search'
        aria-label='Search'
        placeholder='Pizza, coffee, etc'
      />

      <section className='grid gap-4 md:grid-cols-2'>
        {results.map(({ name, slug, imageSource, category, items }) => (
          <section key={slug} className='flex flex-col gap-2'>
            <Link href={'/restaurants/' + slug}>
              <a>
                <section className='flex flex-col gap-y-2'>
                  <Image alt={name} src={imageSource} placeholder='blur' />
                  <span className='font-bold'>{name}</span>
                  <span>Category: {category}</span>
                </section>
              </a>
            </Link>

            <section className='flex gap-x-4'>
              {items.map(({ imageSource, name, basePrice, path }) => (
                <Link key={path} href={path}>
                  <a>
                    <section className='flex flex-col rounded-custom bg-light-elevation p-4 shadow-lg dark:bg-dark-elevation'>
                      <Image alt={name} src={imageSource} placeholder='blur' />
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
    </>
  )
}

export default Search
