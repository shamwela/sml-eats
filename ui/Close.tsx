import { useRouter } from 'next/router'

const Close = () => {
  const router = useRouter()

  return (
    <button
      onClick={() => router.back()}
      aria-label='Close'
      className='max-w-fit bg-transparent p-2'
    >
      <svg
        width='24px'
        height='24px'
        fill='none'
        viewBox='0 0 24 24'
        xmlns='http://www.w3.org/2000/svg'
        aria-hidden='true'
        focusable='false'
      >
        <path
          d='m19.5831 6.24931-1.8333-1.83329-5.75 5.83328-5.75-5.83328-1.8333 1.83329 5.8333 5.74999-5.8333 5.75 1.8333 1.8333 5.75-5.8333 5.75 5.8333 1.8333-1.8333-5.8333-5.75z'
          fill='currentColor'
        ></path>
      </svg>
    </button>
  )
}

export default Close
