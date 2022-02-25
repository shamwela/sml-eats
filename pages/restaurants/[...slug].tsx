import { restaurants } from 'data/restaurants'

export const getStaticPaths = () => {
  const paths = [
    {
      params: {
        slug: ['starbucks', 'test-coffee'],
      },
    },
  ]

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = () => {
  // Fix this later
  return {
    props: {},
  }
}

const ItemPage = () => {
  return <h1>Item Page works!!! Yay!!!</h1>
}

export default ItemPage
