import cx from 'classnames'
import React from 'react'

import styles from './Modal.module.scss'
import { ModalBaseProps } from './types'

export const ModalButtons = ({ children, className }: ModalBaseProps): JSX.Element => (
  <div className={cx(styles.modalButtons, className)}>{children}</div>
)
