import NextImage from 'next/image'
import { useState, useEffect, useRef } from 'react'
import type { ImageProps } from 'next/image'
const reactImageSize = require('react-image-size') // used require because there's no type for this package

const Image = (props: ImageProps) => {
  const { src } = props
  const width = useRef(100)
  const height = useRef(100)
  useEffect(() => {
    const getWidthAndHeight = async () => {
      const size = await reactImageSize(src)
      width.current = size.width
      height.current = size.height
    }
    getWidthAndHeight()
  }, [src])

  const [isLoading, setLoading] = useState(true)
  let finalClassName = 'duration-700 ease-in-out group-hover:opacity-75 '
  if (isLoading) {
    finalClassName += 'scale-110 blur-2xl grayscale'
  } else {
    finalClassName += 'scale-100 blur-0 grayscale-0'
  }

  return (
    <div className='rounded-lg'>
      <NextImage
        {...props}
        width={width.current}
        height={height.current}
        className={finalClassName}
        onLoadingComplete={() => setLoading(false)}
      />
    </div>
  )
}

export default Image
