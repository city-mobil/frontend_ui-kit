import cx from 'classnames'
import React, { CSSProperties } from 'react'

import { ReactComponent as Icon } from '../../assets/svg/ic-activity.svg'
import styles from './Activity.module.scss'

export interface ActivityProps {
  size?: number
  className?: string
  testPrefix?: string
}

export const Activity = ({ size = 36, className, testPrefix = '' }: ActivityProps): JSX.Element => {
  const iconSize: CSSProperties = { width: `${size}px`, height: `${size}px` }

  return (
    <div className={cx(styles.wrapper, className)} data-test-id={`${testPrefix}activity`}>
      <Icon style={iconSize} />
    </div>
  )
}
