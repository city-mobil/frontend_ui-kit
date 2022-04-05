import React from 'react'

import { ReactComponent as CloseIcon } from '../../../assets/svg/ic-reset-value.svg'
import styles from './ToastCloseButton.module.scss'

export interface ToastCloseButtonProps {
  closeToast: VoidFunction
}

export const ToastCloseButton = ({ closeToast }: ToastCloseButtonProps): JSX.Element => (
  <div className={styles.icon} onClick={closeToast} role="presentation">
    <CloseIcon />
  </div>
)
