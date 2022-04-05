import './styles.css'

import React from 'react'
import DayPicker, { DayModifiers } from 'react-day-picker'

import { commonDayPickerOptions, MIN_DATE_PICKER_DATE } from './constants'
import { CalendarProps } from './types'

export const Calendar = ({ value, onChange, disabledDays, flat = false }: CalendarProps): JSX.Element => {
  const className = `Calendar${flat ? ' DayPickerFlat' : ''}`
  const onDayClick = (date: Date, modifiers: DayModifiers): void => {
    if (modifiers.disabled || date < MIN_DATE_PICKER_DATE) {
      return
    }

    if (!onChange) return

    onChange(date)
  }

  return (
    <DayPicker
      {...commonDayPickerOptions}
      selectedDays={value === null ? undefined : value}
      disabledDays={disabledDays}
      month={value === null ? undefined : value}
      className={className}
      onDayClick={onDayClick}
    />
  )
}
