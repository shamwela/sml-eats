import { ChangeEvent, FormEvent, useState } from 'react'

import Head from 'components/Head'
import Link from 'next/link'
import type { Restaurant } from 'types/restaurant'

type Result = {
  name: string
  path: string
}

const Search = ({ restaurants }: { restaurants: Restaurant[] }) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Result[]>([])

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value
    setQuery(query)
  }

  const search = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // Improve this later
    const nestedItems = restaurants.map((restaurant) =>
      restaurant.items.map((item) => ({ name: item.name, path: item.path }))
    )
    const items = nestedItems.flat()
    const results = items.filter((result) =>
      result.name.toLowerCase().includes(query.toLowerCase())
    )

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
