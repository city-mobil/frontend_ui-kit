import React from 'react'

import { Size } from '../../../types'

export interface GroupButtonOption {
  value: string | number
  label: React.ReactNode
}

export interface GroupButtonStyledButtonProps {
  size: Size
  selected: boolean
  fullWidth: boolean
  className?: string
}

export type GroupButtonSingleButtonProps = GroupButtonStyledButtonProps & {
  onChange: (value: string | number) => void
  option: GroupButtonOption
  testPrefix: string
}

export interface GroupButtonProps {
  size: Size
  options: GroupButtonOption[]
  selectedOption: string | number
  onChange: (value: string | number) => void
  fullWidth?: boolean
  className?: string
  testPrefix?: string
}
