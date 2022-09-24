import NextHead from 'next/head'
import { useRouter } from 'next/router'

const Head = ({
  title,
  description = title,
  imageUrl = '/images/sml-eats-open-graph.png',
}: {
  title: string
  description?: string
  imageUrl?: string
}) => {
  const fullTitle = title + ' - SML Eats'
  const baseUrl = 'https://smleats.vercel.app'
  const fullImageUrl = baseUrl + imageUrl

  const { asPath } = useRouter()
  const fullUrl = baseUrl + asPath

  return (
    <NextHead>
      <title>{fullTitle}</title>
      <meta name='robots' content='follow, index' />
      <meta property='og:title' content={fullTitle} />
      <meta name='twitter:title' content={fullTitle} />

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

      <link rel='icon' type='image/x-icon' href='/favicon.ico' />
      <link
        rel='preload'
        href='/fonts/bebas-neue.woff2'
        as='font'
        type='font/woff2'
        crossOrigin='anonymous'
      />
      <link
        rel='preload'
        href='/fonts/inter.woff2'
        as='font'
        type='font/woff2'
        crossOrigin='anonymous'
      />
    </NextHead>
  )
}

export default Head
