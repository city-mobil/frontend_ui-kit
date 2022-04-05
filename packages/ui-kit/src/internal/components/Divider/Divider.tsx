import cx from 'classnames'
import React from 'react'

import styles from './Divider.module.scss'

export interface DividerProps {
  className?: string
}

export const Divider = ({ className }: DividerProps): JSX.Element => {
  return <div className={cx(styles.divider, className)} />
}
