import QuantityChanger from './QuantityChanger'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

it('should render 1 initially', () => {
  render(<QuantityChanger quantity={1} setQuantity={() => {}} />)
  const quantityElement = screen.getByTestId('quantity')
  expect(quantityElement).toBeInTheDocument()
  const quantity = quantityElement.textContent
  expect(quantity).toBe('1')
})

it('should call the setQuantity function when the increase button is clicked', async () => {
  const user = userEvent.setup()
  const setQuantity = jest.fn()
  render(<QuantityChanger quantity={1} setQuantity={setQuantity} />)
  const increaseButton = screen.getByRole('button', {
    name: 'Increase quantity',
  })
  await user.click(increaseButton)
  expect(setQuantity).toHaveBeenCalledTimes(1)
})
