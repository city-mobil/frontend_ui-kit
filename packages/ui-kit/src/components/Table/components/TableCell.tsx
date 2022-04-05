import cx from 'classnames'
import React, { CSSProperties } from 'react'

import styles from '../Table.module.scss'
import { TableCellProps } from '../types'

export const TableCell = ({ className, children, textAlign }: TableCellProps): JSX.Element => {
  const style: CSSProperties = { textAlign: textAlign }

  return (
    <div className={cx(styles.cell, className)} style={style}>
      {children}
    </div>
  )
}
