import { Typography } from '@city/ui-kit-core'
import React from 'react'

import { useSelectContext } from '..'
import styles from './shared.module.scss'

export const NoOptions = (): JSX.Element => {
  const { noOptionsProps } = useSelectContext()

  return (
    <Typography.P13 colorName="secondaryText" className={styles.insteadOfOptions} {...noOptionsProps}>
      Значение не найдено
    </Typography.P13>
  )
}
