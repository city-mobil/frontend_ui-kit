import cx from 'classnames'
import React from 'react'

import { ReactComponent as SvgClose } from '../../../assets/svg/ic-close.svg'
import styles from './Modal.module.scss'
import { ModalBaseProps } from './types'

export interface OnClick {
  onClick?: () => void
}

export const ModalCloseIcon = ({ onClick, className }: ModalBaseProps & OnClick): JSX.Element => {
  return (
    <div onClick={onClick} className={cx(styles.close, className)}>
      <SvgClose />
    </div>
  )
}
