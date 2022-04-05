import cx from 'classnames'
import React, { PropsWithChildren } from 'react'

import { Activity } from '../Activity'
import styles from './Loader.module.scss'

export interface LoaderProps {
  className?: string
  testPrefix?: string
}

export const Loader = ({ children, className, testPrefix = '' }: PropsWithChildren<LoaderProps>): JSX.Element => (
  <div className={cx(styles.backdrop, className)} data-test-id={`${testPrefix}loader`}>
    <div className={styles.wrapper}>
      <Activity />
      {children && <div className={styles.content}>{children}</div>}
    </div>
  </div>
)
