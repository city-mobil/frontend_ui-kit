import './styles.css'

import React, { useState } from 'react'
import DayPicker, { DateUtils, DayModifiers } from 'react-day-picker'

import { commonDayPickerOptions, MIN_DATE_PICKER_DATE } from './constants'
import { getMinMaxDate } from './helpers'
import { CalendarRangeProps, DateRange } from './types'

export const CalendarRange = ({
  startDate,
  endDate,
  onChange,
  disabledDays,
  flat = false,
}: CalendarRangeProps): JSX.Element => {
  const [mouseEnteredToDate, setMouseEnteredToDate] = useState<Date | null>(null)
  const modifiers = {
    highlighted: {
      from: getMinMaxDate([mouseEnteredToDate, startDate || null, endDate || null], 'min'),
      to: getMinMaxDate([mouseEnteredToDate, startDate || null, endDate || null], 'max'),
    },
  }
  const selectedDays = [startDate === null ? undefined : startDate, endDate === null ? undefined : endDate]
  const isRangeComplete = startDate && endDate
  const className = `CalendarRange${flat ? ' DayPickerFlat' : ''}`

  const onDayClick = (date: Date, modifiers: DayModifiers): void => {
    setMouseEnteredToDate(null)

    if (modifiers.disabled || date < MIN_DATE_PICKER_DATE) {
      return
    }

    if (!onChange) return

    if (isRangeComplete) {
      onChange({ from: date, to: null })
    } else {
      const range = DateUtils.addDayToRange(date, { from: startDate, to: endDate }) as DateRange
      onChange(range)
    }
  }

  const handleToMouseEnter = (date: Date): void => {
    if (isRangeComplete) return

    setMouseEnteredToDate(date)
  }

  const handleToMouseLeave = (): void => {
    setMouseEnteredToDate(null)
  }

  return (
    <DayPicker
      {...commonDayPickerOptions}
      selectedDays={selectedDays}
      disabledDays={disabledDays}
      modifiers={modifiers}
      numberOfMonths={2}
      month={startDate || new Date()}
      className={className}
      onDayClick={onDayClick}
      onDayMouseEnter={handleToMouseEnter}
      onDayMouseLeave={handleToMouseLeave}
    />
  )
}
