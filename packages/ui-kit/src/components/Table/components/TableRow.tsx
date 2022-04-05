import cx from 'classnames'
import React from 'react'

import styles from '../Table.module.scss'
import { TableRowProps } from '../types'

export const TableRow = ({ className, children }: TableRowProps): JSX.Element => (
  <div className={cx(styles.row, className)}>{children}</div>
)
