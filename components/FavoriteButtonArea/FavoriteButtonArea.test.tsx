import { render } from '@testing-library/react'
import FavoriteButtonArea from './FavoriteButtonArea'

it('trying something out', () => {
  const { getByText } = render(<FavoriteButtonArea restaurantId={1} />)
  const button = getByText('Add to favorites')
})
