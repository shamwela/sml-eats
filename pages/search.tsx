import { ChangeEvent, FormEvent, useEffect, useState } from 'react'

import Head from 'components/Head'
import Link from 'next/link'
import type { Restaurant } from 'types/restaurant'

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
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Result[]>([])

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

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value
    setQuery(query)
  }

  const search = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const results: Result[] = itemsToSearch.filter((item) => {
      const { name, category, path } = item

      const matchesName = name.toLowerCase().includes(query.toLowerCase())
      const matchesCategory = category
        .toLowerCase()
        .includes(query.toLowerCase())

      if (matchesName || matchesCategory) {
        const result = { name, path }
        return result
      }
    })

    setResults(results)
  }

  return (
    <>
      <Head
        title='Search on SML Eats'
        description='Search on SML Eats'
        imageUrl='/images/seafood-cocktail.jpeg'
      />

      <section className='flex flex-col gap-y-4'>
        <Link href='/'>
          <a className='button max-w-fit'>x</a>
        </Link>

        {/* The user can search by restaurant name, item name, or category */}
        <form onSubmit={search}>
          <input
            type='search'
            name='query'
            placeholder='Food, drinks, etc'
            value={query}
            onChange={handleQueryChange}
            required
          />
          <button type='submit'>Search</button>
        </form>

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
