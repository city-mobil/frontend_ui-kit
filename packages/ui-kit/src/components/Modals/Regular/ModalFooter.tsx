import cx from 'classnames'
import React from 'react'

import { ModalBaseProps } from './types'

export const ModalFooter = ({ children, className }: ModalBaseProps): JSX.Element => (
  <div className={cx('mt-40', className)}>{children}</div>
)
