import QuantityChanger from './QuantityChanger'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

test('if the initial quantity is 1', () => {
  render(<QuantityChanger quantity={1} setQuantity={() => {}} />)
  const quantityElement = screen.getByTestId('quantity')
  expect(quantityElement).toBeInTheDocument()
  const quantity = quantityElement.textContent
  expect(quantity).toBe('1')
})
