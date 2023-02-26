import { type Restaurant } from 'types/restaurant'
import Link from 'next/link'
import Image from 'next/image'
import { StarIcon } from '@heroicons/react/24/outline'

const RestaurantImageGroup = ({
  id,
  name,
  slug,
  rating,
  imageSource,
  imageWidth,
  imageHeight,
}: Restaurant) => {
  return (
    <Link key={id} href={'/restaurants/' + slug}>
      <section className='flex flex-col gap-y-1'>
        <Image
          alt={name}
          src={imageSource}
          width={imageWidth}
          height={imageHeight}
          priority
        />
        <div className='flex justify-between items-start'>
          <span>{name}</span>
          <div className='flex items-center'>
            <StarIcon />
            <span>{rating}</span>
          </div>
        </div>
      </section>
    </Link>
  )
}

export default RestaurantImageGroup
