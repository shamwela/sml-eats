import { createSlice } from '@reduxjs/toolkit'
import { type PayloadAction } from '@reduxjs/toolkit'
import { type CartItem } from 'types/cartItem'

export type CartState = CartItem[]

const initialState: CartState = []

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add: (cart, action: PayloadAction<CartItem>) => {
      const newCartItem = action.payload
      cart.push(newCartItem)
    },
    remove: (cart, action: PayloadAction<number>) => {
      const inputId = action.payload
      const index = cart.findIndex((item) => item.id === inputId)
      cart.splice(index, 1)
    },
    changeQuantity: (
      cart,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const { id, quantity } = action.payload
      const index = cart.findIndex((item) => item.id === id)
      cart[index].quantity = quantity
      // Also change the final price
      cart[index].finalPrice = cart[index].oneItemPrice * quantity
    },
  },
})

export const { add, remove, changeQuantity } = cartSlice.actions
export default cartSlice.reducer
