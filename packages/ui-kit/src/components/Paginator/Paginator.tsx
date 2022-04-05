import cx from 'classnames'
import React from 'react'

import { ReactComponent as ArrowNextIcon } from '../../assets/svg/ic-navigation-next.svg'
import { ReactComponent as ArrowPrevIcon } from '../../assets/svg/ic-navigation-prev.svg'
import { noop } from '../../helpers'
import { DEFAULT_MAX_VISIBLE_PAGES, DOTS } from './constants'
import { getPageCollection } from './helpers'
import styles from './Paginator.module.scss'

export interface PaginatorProps {
  index: number
  totalPages: number
  maxVisiblePages?: number
  onSelect?: (index: number) => void
  className?: string
}

export const Paginator = ({
  index,
  totalPages,
  maxVisiblePages = DEFAULT_MAX_VISIBLE_PAGES,
  onSelect = noop,
  className,
}: PaginatorProps): JSX.Element | null => {
  const collection = getPageCollection(index, totalPages, maxVisiblePages)

  const onClickPrev = (): void => {
    onSelect(index - 1)
  }

  const onClickNext = (): void => {
    onSelect(index + 1)
  }

  const onClickPage = (index: number) => (): void => {
    onSelect(index)
  }

  if (index < 1 || totalPages <= 1 || index > totalPages) {
    return null
  }

  return (
    <ul className={cx(styles.wrapper, className)}>
      <li
        onClick={onClickPrev}
        className={cx(styles.arrow, { [styles.arrow__disabled]: index === 1 })}
        role="presentation"
      >
        <ArrowPrevIcon />
      </li>

      {collection.map((page, i) => {
        if (page === DOTS)
          return (
            <li key={`spread_${i}`} className={styles.spread}>
              {page}
            </li>
          )

        return (
          <li
            key={page}
            onClick={onClickPage(page)}
            className={cx(styles.page, { [styles.page__active]: index === page })}
            role="presentation"
          >
            {page}
          </li>
        )
      })}

      <li
        onClick={onClickNext}
        className={cx(styles.arrow, { [styles.arrow__disabled]: index === totalPages })}
        role="presentation"
      >
        <ArrowNextIcon />
      </li>
    </ul>
  )
}
