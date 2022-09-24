import { useEffect, useState, useTransition } from 'react'
import type { ChangeEvent } from 'react'
import Head from 'components/Head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { InferGetStaticPropsType } from 'next'
import Spinner from 'components/Spinner'
import axios from 'utilities/axios'
import type { NestedRestaurant } from 'types/nestedRestaurant'

export const getStaticProps = async () => {
  // const restaurants = await prisma.restaurant.findMany({
  //   include: {
  //     category: true,
  //     items: {
  //       include: {
  //         category: true,
  //       },
  //     },
  //   },
  // })
  const restaurantResponse = await axios.get('/restaurants', {
    params: { includeItems: true },
  })
  const restaurants: NestedRestaurant[] = restaurantResponse.data
  return {
    props: { restaurants },
  }
}

const Search = ({
  restaurants,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter()
  let query = ''
  if (typeof router.query.query === 'string') {
    query = router.query.query.trim()
  }
  const [isPending, startTransition] = useTransition()
  const [results, setResults] = useState<typeof restaurants | null>(null)
  useEffect(() => {
    if (query === '') {
      setResults(null)
      return
    }
    const matchesNameOrCategory = (name: string, category: string) => {
      const matchesName = name.toLowerCase().includes(query.toLowerCase())
      const matchesCategory = category
        .toLowerCase()
        .includes(query.toLowerCase())
      return matchesName || matchesCategory
    }
    const generateResults = () => {
      const matchedRestaurants = restaurants.filter((restaurant) => {
        const { name, category } = restaurant
        const match = matchesNameOrCategory(name, category.name)
        if (match) {
          return restaurant
        }
      })
      const matchedRestaurantsAndItems = matchedRestaurants.filter(
        ({ items }) => {
          const matchedItems = items.filter((item) => {
            const { name, category } = item
            const match = matchesNameOrCategory(name, category.name)
            if (match) {
              return item
            }
          })
          return matchedItems
        }
      )
      setResults(matchedRestaurantsAndItems)
    }
    startTransition(generateResults)
  }, [query, restaurants])
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
      <div className='grid gap-4 md:grid-cols-2'>
        {isPending && <Spinner />}
        {/* If the user searched and found no results */}
        {query !== '' && results?.length === 0 ? (
          <span>
            No results found for <strong>{query}</strong>
          </span>
        ) : (
          results?.map(
            ({
              id,
              name,
              slug,
              imageSource,
              imageWidth,
              imageHeight,
              category,
              items,
            }) => (
              <div key={id} className='flex flex-col gap-2'>
                <Link href={'/restaurants/' + slug}>
                  <a>
                    <div className='flex flex-col gap-y-2'>
                      <Image
                        alt={name}
                        src={imageSource}
                        width={imageWidth}
                        height={imageHeight}
                        objectFit='cover'
                        priority
                      />
                      <span className='font-semibold'>{name}</span>
                      <span>Category: {category.name}</span>
                    </div>
                  </a>
                </Link>
                <div className='flex gap-x-4'>
                  {items.map(
                    ({
                      id,
                      imageSource,
                      imageWidth,
                      imageHeight,
                      name,
                      basePrice,
                      path,
                    }) => (
                      <Link key={id} href={path}>
                        <a>
                          <div className='flex flex-col rounded-custom bg-light-elevation p-4 shadow-lg dark:bg-dark-elevation'>
                            <Image
                              alt={name}
                              src={imageSource}
                              width={imageWidth}
                              height={imageHeight}
                              priority
                            />
                            <span>{name}</span>
                            <span>${basePrice}</span>
                          </div>
                        </a>
                      </Link>
                    )
                  )}
                </div>
              </div>
            )
          )
        )}
      </div>
    </>
  )
}

export default Search
