import cx from 'classnames'
import React from 'react'

import styles from './ToastContent.module.scss'
import { ToastIcon } from './ToastIcon'

export interface ToastContentProps {
  text: string | JSX.Element
  type: 'success' | 'error'
  className?: string
}

export const ToastContent = ({ text, type, className }: ToastContentProps): JSX.Element => {
  return (
    <div className={cx(styles.content, className)}>
      <ToastIcon type={type} />
      <div className={styles.text}>{text}</div>
    </div>
  )
}
