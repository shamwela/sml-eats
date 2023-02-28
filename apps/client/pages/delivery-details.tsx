import Head from 'components/Head'
import { useLocalStorage } from 'usehooks-ts'
import { useEffect, useState } from 'react'
import { useProtectedRoute } from 'hooks/useProtectedRoute'
import { useIsEnglish } from 'hooks/useIsEnglish'

const DeliveryDetails = () => {
  useProtectedRoute()
  const [address, setAddress] = useLocalStorage('address', '')
  const [showAddressInput, setShowAddressInput] = useState(false)

  const [time, setTime] = useLocalStorage('time', '')
  const [showTimeInput, setShowTimeInput] = useState(false)

  const [formattedTime, setFormattedTime] = useState('')
  useEffect(() => {
    if (time === '') {
      setFormattedTime('')
    } else {
      const dateObject = new Date(time)
      const formatter = new Intl.DateTimeFormat('en-GB', {
        dateStyle: 'full',
        timeStyle: 'short',
        hour12: true,
      })
      const newFormattedTime = formatter.format(dateObject)
      setFormattedTime(newFormattedTime)
    }
  }, [time])

  const today = new Date()

  // This is a hack (https://stackoverflow.com/a/67874053/12552212)
  const todayDOMString = today.toISOString().split('.')[0]

  const nextWeek = new Date()
  nextWeek.setDate(today.getDate() + 7)
  const nextWeekDOMString = nextWeek.toISOString().split('.')[0]
  const isEnglish = useIsEnglish()
  const title = isEnglish ? 'Delivery Details' : 'ပို့ဆောင်မှုအသေးစိတ်'

  return (
    <>
      <Head title={title} />
      <div className='mx-auto flex max-w-md flex-col gap-y-[inherit]'>
        <h1>{title}</h1>
        <div className='flex items-center justify-between gap-x-4'>
          {!showAddressInput && (
            <>
              <span>
                <strong>Address</strong>: {!address ? 'Not set' : address}
              </span>
              <button
                onClick={() => {
                  setAddress('')
                  setShowAddressInput(true)
                }}
              >
                Change
              </button>
            </>
          )}
          {showAddressInput && (
            <>
              <input
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                placeholder='Enter delivery address'
                aria-label='Enter delivery address'
                type='text'
                className='w-full'
              />
              <button onClick={() => setShowAddressInput(false)}>Done</button>
            </>
          )}
        </div>

        <div className='flex items-center justify-between gap-x-4'>
          {!showTimeInput && (
            <>
              <span>
                <strong>Time</strong>:{' '}
                {!formattedTime ? 'Not set' : formattedTime}
              </span>
              <button onClick={() => setShowTimeInput(true)}>Change</button>
            </>
          )}
          {showTimeInput && (
            <>
              <input
                value={time}
                onChange={(event) => setTime(event.target.value)}
                placeholder='Enter time'
                aria-label='Enter time'
                type='datetime-local'
                min={todayDOMString}
                max={nextWeekDOMString}
                className='w-full'
              />
              <button onClick={() => setShowTimeInput(false)}>Done</button>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default DeliveryDetails
