import Head from 'components/Head'
import { useState } from 'react'

const DeliveryDetails = () => {
  const [address, setAddress] = useState('')
  const [showAddressInput, setShowAddressInput] = useState(false)

  // Convert 24 hour format to 12 hour format later
  const [time, setTime] = useState('')
  const [showTimeInput, setShowTimeInput] = useState(false)

  return (
    <>
      <Head title='Delivery details' />

      <h1>Delivery details</h1>

      {!showAddressInput && (
        <div className='flex gap-4'>
          <h2>Address: {address}</h2>
          <button onClick={() => setShowAddressInput(true)}>Change</button>
        </div>
      )}

      {showAddressInput && (
        <>
          <input
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            placeholder='Enter delivery address'
            aria-label='Enter delivery address'
            type='text'
          />
          <button onClick={() => setShowAddressInput(false)}>Done</button>
        </>
      )}

      {!showTimeInput && (
        <div className='flex gap-4'>
          <h2>Time: {time}</h2>
          <button onClick={() => setShowTimeInput(true)}>Change</button>
        </div>
      )}

      {showTimeInput && (
        <>
          <input
            value={time}
            onChange={(event) => setTime(event.target.value)}
            placeholder='Enter time'
            aria-label='Enter time'
            type='time'
          />
          <button onClick={() => setShowTimeInput(false)}>Done</button>
        </>
      )}
    </>
  )
}

export default DeliveryDetails
