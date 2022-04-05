import { Typography } from '@city/ui-kit-core'
import cx from 'classnames'
import React from 'react'

import styles from '../Table.module.scss'
import { TableHeaderProps } from '../types'

export const TableHeader = ({ children, className, ...props }: TableHeaderProps): JSX.Element => (
  <Typography.H4 className={cx(styles.header, className)} {...props}>
    {children}
  </Typography.H4>
)
