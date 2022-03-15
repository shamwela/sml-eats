import ButtonLink from 'components/ButtonLink'
import Head from 'components/Head'

const Custom404 = () => {
  return (
    <>
      <Head title='Page not found' />
      <h1>Sorry, page not found.</h1>
      <ButtonLink href='/'>Find food</ButtonLink>
    </>
  )
}

export default Custom404
