import cx from 'classnames'
import React from 'react'

import { ModalBaseProps } from '../Regular/types'
import styles from './RightSidePanel.module.scss'

export const RightSidePanel = ({ className, children }: ModalBaseProps): JSX.Element => {
  return <div className={cx(styles.content, className)}>{children}</div>
}
