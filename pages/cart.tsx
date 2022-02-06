import type { CartItem } from 'types/cartItem'

const Cart = ({ cart }: { cart: CartItem[] }) => {
  if (!cart) {
    return <p>Your cart is empty.</p>
  }

  return (
    <>
      <strong>Cart</strong>
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
