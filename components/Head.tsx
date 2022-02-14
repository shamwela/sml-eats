import Head from 'next/head'
import { useRouter } from 'next/router'

const CustomHead = ({
  title,
  description = title,
  imageUrl = '/images/sml-eats-open-graph.png',
}: {
  title: string
  description?: string
  imageUrl?: string
}) => {
  const fullTitle = title + ' - SML Eats'
  const baseUrl = 'https://sml-eats.vercel.app'
  const fullImageUrl = baseUrl + imageUrl

  const { asPath } = useRouter()
  const fullUrl = baseUrl + asPath

  return (
    <Head>
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
    </Head>
  )
}

export default CustomHead
