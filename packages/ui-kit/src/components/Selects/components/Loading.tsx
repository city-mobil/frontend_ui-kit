import { Typography } from '@city/ui-kit-core'
import React from 'react'

import { useSelectContext } from '..'
import styles from './shared.module.scss'

export const Loading = (): JSX.Element => {
  const { loadingProps } = useSelectContext()

  return (
    <Typography.P13 colorName="secondaryText" className={styles.insteadOfOptions} {...loadingProps}>
      Поиск...
    </Typography.P13>
  )
}
