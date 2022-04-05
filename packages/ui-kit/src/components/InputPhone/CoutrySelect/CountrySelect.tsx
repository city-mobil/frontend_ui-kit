import React from 'react'

import { Size } from '../../../types'
import { Select } from '../../Selects'
import { CountrySelectOption } from '../types'
import { Popup, SelectItem, Target } from './components'

interface CountryCodeSelectProps {
  size: Size
  value: CountrySelectOption
  className?: string
  disabled?: boolean
  options?: CountrySelectOption[]
  placeholder?: string
  onChange: (value: CountrySelectOption | null) => void
  onFocus?: () => void
  errorTooltipAutoshow?: boolean
  errorTooltipText?: string
}

const components = {
  Target,
  Popup,
  SelectItem,
}

export const CountrySelect = ({
  errorTooltipAutoshow = true,
  errorTooltipText = '',
  value,
  size,
  disabled,
  options,
  placeholder,
  onChange,
}: CountryCodeSelectProps): JSX.Element => {
  return (
    <Select
      components={components}
      searchable={false}
      onChange={onChange}
      value={value}
      errorTooltipAutoShow={errorTooltipAutoshow}
      errorTooltipText={errorTooltipText}
      size={size}
      disabled={disabled}
      options={options}
      placeholder={placeholder}
    />
  )
}
