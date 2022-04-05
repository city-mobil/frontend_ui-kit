import React, { useMemo } from 'react'
import { Table } from '../../../components/Table'
import { useSorter } from '../../../hooks'

export default {
  title: 'Table/Sorted',
}

const FRUITS = [
  {
    name: 'Apple',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/265px-Red_Apple.jpg',
    price: 35,
  },
  {
    name: 'Banana',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Bananas_white_background_DS.jpg/320px-Bananas_white_background_DS.jpg',
    price: 12,
  },
  {
    name: 'Grapes',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Table_grapes_on_white.jpg/320px-Table_grapes_on_white.jpg',
    weight: 0.1,
    price: 45,
  },
  {
    name: 'Pineapple',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Pineapple_and_cross_section.jpg/286px-Pineapple_and_cross_section.jpg',
    price: 200,
  },
]

export const SortedTable = () => {
  const [sort, setSort] = useSorter()

  const data = useMemo(() => {
    if (!sort) {
      return FRUITS
    }

    switch (sort.field) {
      case 'name':
        const sortedByName = FRUITS.sort((prev, next) => prev.name.charCodeAt(0) - next.name.charCodeAt(0))

        return sort.order === 'asc' ? sortedByName : sortedByName.reverse()
      case 'price':
        const sortedByPrice = FRUITS.sort((prev, next) => prev.price - next.price)

        return sort.order === 'asc' ? sortedByPrice : sortedByPrice.reverse()
      default:
        return FRUITS
    }
  }, [sort])

  return (
    <>
      <Table.Header>Таблица с сортировкой</Table.Header>
      <Table columnWidths={['1fr', '1fr', '1fr']}>
        <Table.Row>
          <Table.HeaderCell sortName="name" sort={sort} onReSort={setSort}>
            Имя
          </Table.HeaderCell>
          <Table.HeaderCell>Картинка</Table.HeaderCell>
          <Table.HeaderCell sortName="price" sort={sort} onReSort={setSort}>
            Цена
          </Table.HeaderCell>
        </Table.Row>
        {data.map((item) => (
          <Table.Row key={item.name}>
            <Table.Cell>{item.name}</Table.Cell>
            <Table.Cell>
              <img src={item.image} height="16" />
            </Table.Cell>
            <Table.Cell>{item.price}</Table.Cell>
          </Table.Row>
        ))}
      </Table>
    </>
  )
}
