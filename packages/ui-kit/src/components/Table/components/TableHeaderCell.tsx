import cx from 'classnames'
import React, { PropsWithChildren, useCallback } from 'react'

import { ReactComponent as Icon } from '../../../assets/svg/sort.svg'
import styles from '../Table.module.scss'
import { TableHeaderCellProps } from '../types'

export const TableHeaderCell = ({
  className,
  sortName,
  sort,
  onReSort,
  children,
}: PropsWithChildren<TableHeaderCellProps>): JSX.Element => {
  const isSortable = Boolean(onReSort)
  const isSorted = Boolean(isSortable && sort && sortName === sort.field)

  const onClick = useCallback(() => {
    if (!isSortable) {
      return
    }

    if (!isSorted) {
      onReSort && onReSort({ field: sortName || '', order: 'asc' })
    } else if (sort?.order === 'asc') {
      onReSort && onReSort({ field: sortName || '', order: 'desc' })
    } else {
      onReSort && onReSort(null)
    }
  }, [isSorted, isSortable, sortName, sort, onReSort])

  const order = sort ? sort.order : null

  return (
    <div
      className={cx(styles.headerCell, { [styles.headerCell_sortable]: isSortable }, className)}
      onClick={onClick}
      role="presentation"
    >
      <div>{children}</div>
      <div
        className={cx(styles.headerCellIcon, {
          [styles.headerCellIcon_sorted]: isSorted,
          [styles.headerCellIcon_desc]: order === 'desc',
        })}
      >
        <Icon />
      </div>
    </div>
  )
}
