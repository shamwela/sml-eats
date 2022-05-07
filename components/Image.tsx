import NextImage from 'next/image'
import { useState, useLayoutEffect, useRef } from 'react'
import type { ImageProps } from 'next/image'
import reactImageSize from 'react-image-size'

const Image = (props: ImageProps) => {
  const { src } = props
  const width = useRef<number | undefined>(0)
  const height = useRef<number | undefined>(0)
  useLayoutEffect(() => {
    // If the src is a static import, width and height aren't needed
    if (typeof src !== 'string') {
      width.current = undefined
      height.current = undefined
      return
    }
    const getWidthAndHeight = async () => {
      const size = await reactImageSize(src)
      width.current = size.width
      height.current = size.height
    }
    getWidthAndHeight()
  }, [src])

  const [isLoading, setLoading] = useState(true)
  let finalClassName = 'duration-700 ease-in-out '
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
