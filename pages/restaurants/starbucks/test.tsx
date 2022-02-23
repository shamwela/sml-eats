import Item from 'components/Item'
import type { AddItem } from 'types/addItem'

type TestProps = {
  addItem: AddItem
}

const Test = ({ addItem }: TestProps) => {
  return (
    <Item restaurantName='Starbucks' itemName='Iced Coffee' addItem={addItem} />
  )
}

export default Test
