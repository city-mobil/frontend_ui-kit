import cx from 'classnames'
import React from 'react'

import styles from './Modal.module.scss'
import { ModalBaseProps } from './types'

interface HasCloseIcon {
  hasCloseIcon?: boolean
}

export const ModalHeader = ({ hasCloseIcon = true, children }: ModalBaseProps & HasCloseIcon): JSX.Element => (
  <div className={cx({ [styles.headerWithCloseIcon]: hasCloseIcon })}>{children}</div>
)
