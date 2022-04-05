import React, { useMemo } from 'react'

import { FlatSelectDefaults } from './components'
import { Select } from './Select'
import { SelectBaseOption, SelectProps } from './types'

export const FlatSelect = <T extends SelectBaseOption = SelectBaseOption>(
  props: SelectProps<T, HTMLButtonElement>,
): JSX.Element => {
  const { components, ...rest } = props

  const resultComponents = useMemo(
    () => ({ Target: FlatSelectDefaults.Target, Popup: FlatSelectDefaults.Popup, ...components }),
    [components],
  )

  return <Select components={resultComponents} {...rest} />
}
