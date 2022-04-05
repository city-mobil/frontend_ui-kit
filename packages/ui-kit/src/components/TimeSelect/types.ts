import React from 'react'

import { Size } from '../../types'

export interface HoursMinutes {
  hours: string
  minutes: string
}

export interface TimeSelectProps {
  onChange: (value: HoursMinutes) => void
  hours: string
  minutes: string
  size?: Size
  placeholder?: string
  testPrefix?: string
}

export interface TimeSelectListProps {
  hours: string
  minutes: string
  onChange: (value: HoursMinutes) => void
  testPrefix: string
}

export interface NumbersListProps {
  numbers: string[]
  value: string | number
  onChange: (val: string) => void
  testPrefix: string
}

export interface NumberProps {
  onMouseDown: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void
  number: string
  testPrefix: string
}
