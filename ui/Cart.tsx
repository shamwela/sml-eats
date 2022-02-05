import type { Item } from 'types/item'

const Cart = ({ cart }: { cart: Item[] }) => {
  if (!cart) {
    return <p>Your cart is empty.</p>
  }

  return (
    <>
      <h2>Cart</h2>
      {cart?.map(({ name, quantity, finalPrice }) => {
        return (
          <div key={name}>
            <p>
              {quantity} x {name} = ${finalPrice}
            </p>
          </div>
        )
      })}
    </>
  )
}

export default Cart
