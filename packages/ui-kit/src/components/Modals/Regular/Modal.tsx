import cx from 'classnames'
import React, { useLayoutEffect } from 'react'

import styles from './Modal.module.scss'
import { ModalBaseProps } from './types'

function useLockBodyScroll(): void {
  useLayoutEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow
    document.body.style.overflow = 'hidden'

    return (): void => {
      document.body.style.overflow = originalStyle
    }
  }, [])
}

interface Width {
  width?: string
}

export const Modal = ({ children, width = 'auto', className }: ModalBaseProps & Width): JSX.Element => {
  useLockBodyScroll()

  return (
    <div className={cx(styles.modalContainer, className)}>
      <div style={{ width }} className={styles.modalContent}>
        {children}
      </div>
    </div>
  )
}
