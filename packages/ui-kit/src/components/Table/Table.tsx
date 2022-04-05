import cx from 'classnames'
import React, { CSSProperties } from 'react'

import { TableCell, TableHeader, TableHeaderCell, TableRow } from './components'
import styles from './Table.module.scss'
import { TableProps, TableSubcomponents } from './types'

const Table: React.FC<TableProps> & TableSubcomponents = ({ className, columnWidths, children }) => {
  const style: CSSProperties = { gridTemplateColumns: columnWidths.join(' ') }

  return (
    <div className={cx(styles.table, className)} style={style}>
      {children}
    </div>
  )
}

Table.Header = TableHeader
Table.Row = TableRow
Table.HeaderCell = TableHeaderCell
Table.Cell = TableCell

export { Table }
