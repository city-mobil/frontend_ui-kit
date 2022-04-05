import cx from 'classnames'
import React from 'react'

import { ModalBaseProps } from '../Regular/types'
import styles from './FullscreenModal.module.scss'

export const FullScreenModal = ({ children, className }: ModalBaseProps): JSX.Element => {
  return (
    <div className={cx(styles.fullScreen, className)}>
      <div>{children}</div>
    </div>
  )
}
