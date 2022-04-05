import React from 'react'
import { Table } from '../../../components/Table'

export default {
  title: 'Table/Plain',
}

const LOREM =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

export const Simple = () => {
  return (
    <>
      <Table.Header>Простая Таблица</Table.Header>
      <Table columnWidths={['1fr', '2fr', '2fr']}>
        <Table.Row>
          <Table.HeaderCell>Id</Table.HeaderCell>
          <Table.HeaderCell>Имя</Table.HeaderCell>
          <Table.HeaderCell>Примечания</Table.HeaderCell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>123</Table.Cell>
          <Table.Cell>Иван Иванович Иванов</Table.Cell>
          <Table.Cell>Болел в детстве</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>234</Table.Cell>
          <Table.Cell>Пупкин Василий Петрович</Table.Cell>
          <Table.Cell>Очень любит поспать на работе</Table.Cell>
        </Table.Row>
      </Table>
    </>
  )
}

export const Dynamic = () => {
  return (
    <>
      <Table.Header>Адаптивная Таблица</Table.Header>
      <Table columnWidths={['auto', 'auto', 'auto']}>
        <Table.Row>
          <Table.HeaderCell>Id</Table.HeaderCell>
          <Table.HeaderCell>Имя</Table.HeaderCell>
          <Table.HeaderCell>Примечания</Table.HeaderCell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>123</Table.Cell>
          <Table.Cell>Иван Иванович Иванов</Table.Cell>
          <Table.Cell>{LOREM}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>123</Table.Cell>
          <Table.Cell>{LOREM}</Table.Cell>
          <Table.Cell>Иван Иванович Иванов</Table.Cell>
        </Table.Row>
      </Table>
    </>
  )
}
