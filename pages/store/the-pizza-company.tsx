import Link from 'next/link'

const ThePizzaCompany = () => {
  return (
    <>
      <h1>The Pizza Company</h1>
      <Link href='/store/the-pizza-company/seafood-cocktail'>
        <a>Seafood Cocktail</a>
      </Link>
    </>
  )
}

export default ThePizzaCompany
