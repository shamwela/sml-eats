import Script from 'next/script'

const GoogleAnalyticsScripts = () => {
  if (process.env.NODE_ENV !== 'production') {
    return null
  }
  const GoogleAnalyticsId = 'G-JEVR9X9ZL1'
  return (
    <>
      <Script
        strategy='lazyOnload'
        src={`https://www.googletagmanager.com/gtag/js?id=${GoogleAnalyticsId}`}
      />
      <Script strategy='lazyOnload' id='google-analytics-script'>
        {`
          window.dataLayer = window.dataLayer || []
          function gtag() {
            dataLayer.push(arguments)
          }
          gtag('js', new Date())
          gtag('config', '${GoogleAnalyticsId}', {
          page_path: window.location.pathname,
          })
          `}
      </Script>
    </>
  )
}

export default GoogleAnalyticsScripts
