import { Typography } from '@city/ui-kit-core'
import React from 'react'
import { LocaleUtils } from 'react-day-picker'

import styles from './Caption.module.scss'

export interface ICaptionProps {
  localeUtils: LocaleUtils
  date: Date
  locale: string
  months?: string[]
}

export const Caption = ({ date, months }: ICaptionProps): JSX.Element => (
  <div className={styles.container}>
    <Typography.P13 className={styles.year}>{date.getFullYear()}</Typography.P13>
    <Typography.H5 className={styles.month}>{months && months[date.getMonth()]}</Typography.H5>
  </div>
)
