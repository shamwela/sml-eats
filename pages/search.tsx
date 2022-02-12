import { ChangeEvent, useEffect, useState } from 'react'

import Close from 'ui/Close'
import Head from 'components/Head'
import Link from 'next/link'
import type { Restaurant } from 'types/restaurant'
import { useRouter } from 'next/router'

type ItemToSearch = {
  name: string
  category: string
  path: string
}
type Result = {
  name: string
  path: string
}

const Search = ({ restaurants }: { restaurants: Restaurant[] }) => {
  const router = useRouter()
  let query = ''
  if (typeof router.query.query === 'string') {
    query = router.query.query
  }

  const [results, setResults] = useState<Result[]>([])

  useEffect(() => {
    // --- Later, move "itemsToSearch" to getStaticProps() or something ---
    let itemsToSearch: ItemToSearch[] = []
    restaurants.forEach(({ name, path, category }) => {
      itemsToSearch.push({ name, path, category })
    })
    restaurants.forEach(({ items }) => {
      items.forEach(({ name, path, category }) => {
        itemsToSearch.push({ name, path, category })
      })
    })
    // --- Later, move "itemsToSearch" to getStaticProps() or something ---

    const getResults = () => {
      const results: Result[] = itemsToSearch.filter(
        ({ name, category, path }) => {
          const matchesName = name.toLowerCase().includes(query.toLowerCase())
          const matchesCategory = category
            .toLowerCase()
            .includes(query.toLowerCase())

          if (matchesName || matchesCategory) {
            const result = { name, path }
            return result
          }
        }
      )

      return results
    }

    // If there's no query, don't show any results
    if (query === '') {
      setResults([])
    } else {
      const results = getResults()
      setResults(results)
    }
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
          placeholder='Food, drinks, etc'
          required
        />

        {results.map(({ name, path }) => (
          <Link href={path} key={path}>
            <a>{name}</a>
          </Link>
        ))}
      </section>
    </>
  )
}

export default Search
