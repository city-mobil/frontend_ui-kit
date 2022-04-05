import { Modifier } from 'react-day-picker'

import { Size } from '../../types'

export interface DateRange {
  from: Date | null
  to: Date | null
}

export interface CalendarProps {
  onChange?: (date: Date) => void
  value?: Date | null
  disabledDays?: Modifier | Modifier[]
  flat?: boolean
}

export interface CalendarRangeProps {
  onChange?: (dateRange: DateRange) => void
  startDate?: Date | null
  endDate?: Date | null
  disabledDays?: Modifier | Modifier[]
  flat?: boolean
}

export interface DatePickerProps {
  onChange?: (date: Date | null) => void
  value?: Date | null
  size?: Size
  disabledDays?: Modifier | Modifier[]
  placeholder?: string
}

export interface RangeDatePickerProps {
  size?: Size
  onChange?: (dateRange: DateRange) => void
  startDate?: Date | null
  endDate?: Date | null
  disabledDays?: Modifier | Modifier[]
  startPlaceholder?: string
  endPlaceholder?: string
  testPrefix?: string
}
