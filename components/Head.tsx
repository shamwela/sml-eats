import Head from 'next/head'
import { useRouter } from 'next/router'

const CustomHead = ({
  title,
  description,
  imageUrl,
}: {
  title: string
  description: string
  imageUrl: string
}) => {
  const baseUrl = 'https://sml-eats.vercel.app'
  const fullImageUrl = baseUrl + imageUrl

  const { asPath } = useRouter()
  const fullUrl = baseUrl + asPath

  return (
    <Head>
      <title>{title}</title>
      <meta name='robots' content='follow, index' />
      <meta property='og:title' content={title} />
      <meta name='twitter:title' content={title} />

      <meta name='description' content={description} />
      <meta property='og:description' content={description} />
      <meta name='twitter:description' content={description} />

      <meta name='image' content={fullImageUrl} />
      <meta property='og:image' content={fullImageUrl} />
      <meta name='twitter:image' content={fullImageUrl} />

      <meta property='og:url' content={fullUrl} />
      <link rel='canonical' href={fullUrl} />

      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:creator' content='@shamwela_' />
      <meta name='twitter:site' content='@shamwela_' />

      <meta property='og:type' content='website' />
      <meta property='og:site_name' content='SML Eats' />
    </Head>
  )
}

export default CustomHead
