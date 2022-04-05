import './styles.css'

import { noop } from '@city/ui-kit-core'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { DayModifiers } from 'react-day-picker'
import DPI from 'react-day-picker/DayPickerInput'
import useOnClickOutside from 'use-onclickoutside'

import { useRunAfterUpdate } from '../../hooks'
import { DatePickerInput } from './components'
import { commonDayPickerOptions, MIN_DATE_PICKER_DATE, PLACEHOLDERS } from './constants'
import styles from './DatePicker.module.scss'
import { dateToString, maskValue, stringToDate } from './helpers'
import { DatePickerProps } from './types'
import { useDatePickerInputState } from './useDatePickerInputState'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const DayPickerInput: typeof DPI = DPI.__esModule ? DPI.default : DPI

export const DatePicker = ({
  onChange = noop,
  value,
  size = 'sm',
  disabledDays,
  placeholder,
}: DatePickerProps): JSX.Element => {
  const inputRef = useRef<DPI | null>(null)
  const containerRef = useRef(null)
  const [datePickerFocused, setDatePickerFocused] = useState(false)
  const [inputValue, setInputValue] = useState(() => dateToString(value))

  useEffect(() => {
    if (value !== undefined) {
      setInputValue(dateToString(value))
    }
  }, [value])

  const handleFocus = useCallback(() => {
    setDatePickerFocused(true)
    if (value !== undefined) {
      setInputValue(dateToString(value))
    }
  }, [value])

  const { onBlur, onFocus, inputFocused } = useDatePickerInputState(handleFocus)

  const handleClickOutside = useCallback(() => {
    if (datePickerFocused) {
      setDatePickerFocused(false)
      onChange(stringToDate(inputValue))
    }
  }, [datePickerFocused, inputValue, onChange])

  useOnClickOutside(containerRef, handleClickOutside)

  const runAfterUpdateRef = useRunAfterUpdate()

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (['Enter', 'Tab', 'Escape'].includes(e.key)) {
        onChange(stringToDate(inputValue))
      }

      if (e.key === 'Escape' || e.key === 'Enter') {
        if (inputRef.current) {
          const inputEl = inputRef.current.getInput() as HTMLInputElement
          inputEl.blur()
        }

        setDatePickerFocused(false)
      }
    },
    [inputValue, onChange],
  )

  const onInputChange = (event: React.SyntheticEvent<HTMLInputElement, KeyboardEvent>): void => {
    const { value } = event.currentTarget
    const caretPosition = event.currentTarget.selectionStart ?? 0
    const beforeCaret = value.slice(0, caretPosition)
    const afterCaret = value.slice(caretPosition, value.length)
    const maskedBeforeCaret = maskValue(beforeCaret)
    const newCaretPosition = maskedBeforeCaret.length
    const newInputValue = maskValue(maskedBeforeCaret + afterCaret)

    setInputValue(newInputValue)

    const inputElement = event.currentTarget

    runAfterUpdateRef.current = (): void => {
      inputElement.selectionStart = newCaretPosition
      inputElement.selectionEnd = newCaretPosition
    }
  }

  const onDayClick = (date: Date, modifiers: DayModifiers): void => {
    if (inputRef.current) {
      const inputEl = inputRef.current.getInput() as HTMLInputElement
      inputEl.blur()
    }

    if (modifiers.disabled || date < MIN_DATE_PICKER_DATE) {
      return
    }

    setInputValue(dateToString(date))
    onChange(date)
  }

  const unfocusedPlaceholder = placeholder || PLACEHOLDERS.chooseDate
  const dateValue = inputFocused || !value ? stringToDate(inputValue) : value

  return (
    <div className={styles.container} ref={containerRef}>
      <DayPickerInput
        ref={inputRef}
        value={dateValue || ''}
        dayPickerProps={{
          ...commonDayPickerOptions,
          selectedDays: !dateValue ? undefined : dateValue,
          disabledDays,
          month: !dateValue ? undefined : dateValue,
          className: 'Single-day-picker-customization',
          onDayClick,
        }}
        inputProps={{
          onFocus,
          onBlur,
          onKeyDown,
          inputFocused,
          size,
          inputValue: dateToString(dateValue) || inputValue,
          onInputChange,
        }}
        component={DatePickerInput}
        placeholder={!inputFocused || size === 'lg' ? unfocusedPlaceholder : PLACEHOLDERS.pattern}
        classNames={{
          container: `DayPickerInput ${inputFocused ? 'focused' : ''}`,
          overlayWrapper: '',
          overlay: '',
        }}
      />
    </div>
  )
}
