import './styles.css'

import { noop } from '@city/ui-kit-core'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { DayModifiers } from 'react-day-picker'
import DPI from 'react-day-picker/DayPickerInput'
import useOnClickOutside from 'use-onclickoutside'

import { useRunAfterUpdate } from '../../hooks'
import { DatePickerInput } from './components'
import { commonDayPickerOptions, MIN_DATE_PICKER_DATE, PLACEHOLDERS } from './constants'
import { dateToString, getToMonth, maskValue, stringToDate } from './helpers'
import styles from './RangeDatePicker.module.scss'
import { DateRange, RangeDatePickerProps } from './types'
import { useDatePickerInputState } from './useDatePickerInputState'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const DayPickerInput: typeof DPI = DPI.__esModule ? DPI.default : DPI

export const RangeDatePicker = ({
  onChange = noop,
  size = 'sm',
  startDate,
  endDate,
  disabledDays,
  startPlaceholder = PLACEHOLDERS.start,
  endPlaceholder = PLACEHOLDERS.end,
  testPrefix = '',
}: RangeDatePickerProps): JSX.Element => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const toDayPickerInputRef = useRef<DPI | null>(null)
  const fromDayPickerInputRef = useRef<DPI | null>(null)
  const [datePickerFocused, setDatePickerFocused] = useState(false)
  const [mouseEnteredToDate, setMouseEnteredToDate] = useState<Date | null>(null)
  const [inputValues, setInputValues] = useState(() => ({
    from: dateToString(startDate),
    to: dateToString(endDate),
  }))

  useEffect(() => {
    if (startDate !== undefined || endDate !== undefined) {
      setInputValues({
        from: dateToString(startDate),
        to: dateToString(endDate),
      })
    }
  }, [startDate, endDate])

  const handleFocus = useCallback(() => {
    setDatePickerFocused(true)
    if (startDate !== undefined || endDate !== undefined) {
      setInputValues({
        from: dateToString(startDate),
        to: dateToString(endDate),
      })
    }
  }, [endDate, startDate])

  const {
    onBlur: onStartBlur,
    onFocus: onStartFocus,
    inputFocused: startFocused,
  } = useDatePickerInputState(handleFocus)
  const { onBlur: onEndBlur, onFocus: onEndFocus, inputFocused: endFocused } = useDatePickerInputState(handleFocus)

  const onFromKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const dateRange = {
        from: stringToDate(inputValues.from),
        to: stringToDate(inputValues.to),
      }

      if (['Enter', 'Tab', 'Escape'].includes(e.key)) {
        onChange(dateRange)
      }

      if (e.key === 'Enter') {
        if (toDayPickerInputRef.current) {
          const inputElement = toDayPickerInputRef.current.getInput() as HTMLInputElement
          inputElement.focus()
        }
      }

      if (e.key === 'Escape') {
        if (fromDayPickerInputRef.current) {
          const inputElement = fromDayPickerInputRef.current.getInput() as HTMLInputElement
          inputElement.blur()
        }

        setDatePickerFocused(false)
      }
    },
    [inputValues.from, inputValues.to, onChange],
  )

  const onToKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const dateRange = {
        from: stringToDate(inputValues.from),
        to: stringToDate(inputValues.to),
      }

      if (['Enter', 'Tab', 'Escape'].includes(e.key)) {
        if (toDayPickerInputRef.current) {
          const inputElement = toDayPickerInputRef.current.getInput() as HTMLInputElement
          inputElement.blur()
        }

        setDatePickerFocused(false)
        onChange(dateRange)
      }
    },
    [inputValues.from, inputValues.to, onChange],
  )

  const handleClickOutside = useCallback(() => {
    const dateRange = {
      from: stringToDate(inputValues.from),
      to: stringToDate(inputValues.to),
    }

    if (datePickerFocused) {
      setDatePickerFocused(false)
      onChange(dateRange)
    }
  }, [datePickerFocused, inputValues.from, inputValues.to, onChange])

  useOnClickOutside(containerRef, handleClickOutside)

  const runAfterUpdateRef = useRunAfterUpdate()

  const onInputChange = (event: React.SyntheticEvent<HTMLInputElement, KeyboardEvent>): void => {
    const { value } = event.currentTarget
    const { name = '' } = event.currentTarget.dataset
    const caretPosition = Number(event.currentTarget.selectionStart)
    const beforeCaret = value.slice(0, caretPosition)
    const afterCaret = value.slice(caretPosition, value.length)
    const maskedBeforeCaret = maskValue(beforeCaret)
    const newCaretPosition = maskedBeforeCaret.length
    const newInputValues = { ...inputValues, [name]: maskValue(maskedBeforeCaret + afterCaret) }

    const newDates = {
      from: stringToDate(newInputValues.from),
      to: stringToDate(newInputValues.to),
    }

    if (newDates.from && newDates.to && newDates.from > newDates.to) {
      setInputValues({ from: newInputValues.to, to: newInputValues.from })
    } else {
      setInputValues(newInputValues)
    }

    const inputElement = event.currentTarget

    runAfterUpdateRef.current = (): void => {
      inputElement.selectionStart = newCaretPosition
      inputElement.selectionEnd = newCaretPosition
    }
  }

  const handleFromDayClick = (date: Date, modifiers: DayModifiers): void => {
    setMouseEnteredToDate(null)

    if (toDayPickerInputRef.current) {
      const inputElement = toDayPickerInputRef.current.getInput() as HTMLInputElement
      inputElement.focus()
    }

    if (modifiers.disabled || date < MIN_DATE_PICKER_DATE) {
      return
    }

    const toDate = stringToDate(inputValues.to)
    const newDateRange: DateRange = { from: null, to: null }

    if (toDate && date > toDate) {
      newDateRange.from = date
      newDateRange.to = null
    } else {
      newDateRange.from = date
      newDateRange.to = toDate
    }

    setInputValues({
      from: dateToString(newDateRange.from),
      to: dateToString(newDateRange.to),
    })
    onChange(newDateRange)
  }

  const handleToDayClick = (date: Date, modifiers: DayModifiers): void => {
    setMouseEnteredToDate(null)

    if (toDayPickerInputRef.current) {
      const inputElement = toDayPickerInputRef.current.getInput() as HTMLInputElement
      inputElement.blur()
    }

    if (modifiers.disabled || date < MIN_DATE_PICKER_DATE) {
      return
    }

    const fromDate = stringToDate(inputValues.from)
    const newDateRange: DateRange = { from: null, to: null }

    if (fromDate && date < fromDate) {
      newDateRange.from = null
      newDateRange.to = date

      if (fromDayPickerInputRef.current) {
        const inputElement = fromDayPickerInputRef.current.getInput() as HTMLInputElement
        inputElement.focus()
      }
    } else {
      newDateRange.from = fromDate
      newDateRange.to = date
    }

    setInputValues({
      from: dateToString(newDateRange.from),
      to: dateToString(newDateRange.to),
    })
    onChange(newDateRange)
    setDatePickerFocused(false)

    if (!toDayPickerInputRef.current) return

    const inputElement = toDayPickerInputRef.current.getInput() as HTMLInputElement
    inputElement.blur()
  }

  const handleToMouseEnter = useCallback((date: Date) => {
    setMouseEnteredToDate(date)
  }, [])
  const handleToMouseLeave = useCallback(() => {
    setMouseEnteredToDate(null)
  }, [])

  const fromDate = startFocused || !startDate ? stringToDate(inputValues.from) : startDate
  const toDate = endFocused || !endDate ? stringToDate(inputValues.to) : endDate
  const modifiers = {
    highlighted: { from: fromDate, to: mouseEnteredToDate || toDate },
  }
  const selectedDays = [fromDate === null ? undefined : fromDate, toDate === null ? undefined : toDate]
  const toDateFirstShowedMonth = getToMonth(fromDate, toDate)

  return (
    <div ref={containerRef} className={styles.container}>
      <DayPickerInput
        value={fromDate || ''}
        ref={fromDayPickerInputRef}
        dayPickerProps={{
          ...commonDayPickerOptions,
          selectedDays,
          disabledDays,
          modifiers,
          numberOfMonths: 2,
          onDayClick: handleFromDayClick,
          className: 'DateRange-day-picker-customization',
          month: fromDate === null ? undefined : fromDate,
        }}
        component={DatePickerInput}
        inputProps={{
          rightSquareBorder: true,
          onFocus: onStartFocus,
          onBlur: onStartBlur,
          onKeyDown: onFromKeyDown,
          inputFocused: startFocused,
          size,
          onInputChange: onInputChange,
          inputValue: dateToString(fromDate) || inputValues.from,
          'data-name': 'from',
          testPrefix: `${testPrefix}date-picker-from-`,
        }}
        placeholder={!startFocused || size === 'lg' ? startPlaceholder : PLACEHOLDERS.pattern}
        classNames={{
          container: `DayPickerInput from ${startFocused ? 'focused' : ''}`,
          overlayWrapper: '',
          overlay: '',
        }}
      />
      <DayPickerInput
        value={toDateFirstShowedMonth}
        ref={toDayPickerInputRef}
        dayPickerProps={{
          ...commonDayPickerOptions,
          selectedDays,
          disabledDays,
          modifiers,
          numberOfMonths: 2,
          onDayMouseEnter: handleToMouseEnter,
          onDayMouseLeave: handleToMouseLeave,
          onDayClick: handleToDayClick,
          className: 'DateRange-day-picker-customization',
          month: toDateFirstShowedMonth,
        }}
        component={DatePickerInput}
        inputProps={{
          onFocus: onEndFocus,
          onBlur: onEndBlur,
          onKeyDown: onToKeyDown,
          inputFocused: endFocused,
          size,
          onInputChange: onInputChange,
          inputValue: dateToString(toDate) || inputValues.to,
          'data-name': 'to',
          leftSquareBorder: true,
          testPrefix: `${testPrefix}date-picker-to-`,
        }}
        placeholder={!endFocused || size === 'lg' ? endPlaceholder : PLACEHOLDERS.pattern}
        classNames={{
          container: `DayPickerInput ${endFocused ? 'focused' : ''}`,
          overlayWrapper: '',
          overlay: '',
        }}
      />
    </div>
  )
}
