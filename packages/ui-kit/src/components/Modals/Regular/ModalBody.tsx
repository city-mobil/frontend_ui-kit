import cx from 'classnames'
import React from 'react'

import { ModalBaseProps } from './types'

export const ModalBody = ({ children, className = '' }: ModalBaseProps): JSX.Element => (
  <div className={cx('mt-16', className)}>{children}</div>
)
