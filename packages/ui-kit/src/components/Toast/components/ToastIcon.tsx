import React from 'react'

import { ReactComponent as SuccessIcon } from '../../../assets/svg/ic-success.svg'
import { ReactComponent as ErrorIcon } from '../../../assets/svg/ic-warning.svg'
import styles from './ToastIcon.module.scss'

const icons = {
  success: SuccessIcon,
  error: ErrorIcon,
} as const

export interface ToastIconProps {
  type: 'success' | 'error'
}

export const ToastIcon = ({ type }: ToastIconProps): JSX.Element | null => {
  const Icon = icons[type]

  if (!Icon) {
    return null
  }

  return (
    <div className={styles.icon}>
      <Icon height={24} width={24} />
    </div>
  )
}
