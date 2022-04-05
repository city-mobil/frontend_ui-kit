import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { ReactComponent as ClockIcon } from '../../assets/svg/ic-clock.svg'
import { Input } from '../Input'
import { getComplementedTime, getValidHours, getValidMinutes, sanitizeValue } from './helpers'
import styles from './TimeSelect.module.scss'
import { TimeSelectList } from './TimeSelectList'
import { HoursMinutes, TimeSelectProps } from './types'

const FOCUS_PLACEHOLDER = 'ЧЧ:ММ'
const DEFAULT_PLACEHOLDER = 'Введите время'
const COMPLETE_TIME_REG_EXP = /^(\d{2}):(\d{2})/

export const TimeSelect = ({
  onChange,
  size = 'md',
  placeholder = DEFAULT_PLACEHOLDER,
  hours,
  minutes,
  testPrefix = '',
}: TimeSelectProps): JSX.Element => {
  const [focus, setFocus] = useState(false)
  const [inputValue, setInputValue] = useState(() => sanitizeValue(getComplementedTime(hours, minutes)))
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    setInputValue(sanitizeValue(getComplementedTime(hours, minutes)))
  }, [hours, minutes])

  const computedPlaceholder = useMemo(() => {
    const isLarge = size === 'lg'

    return focus && !isLarge ? FOCUS_PLACEHOLDER : placeholder
  }, [focus, placeholder, size])

  const onTimeSelect = (value: HoursMinutes): void => {
    onChange(value)
  }

  const onFocus = (): void => {
    setFocus(true)
  }

  const onBlur = (): void => {
    setFocus(false)
    setInputValue(sanitizeValue(getComplementedTime(hours, minutes)))
  }

  const onKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputRef.current) {
      inputRef.current.blur()
    }
  }, [])

  const handleInputChange = (value: string): void => {
    if (!value) {
      onChange({ hours: '', minutes: '' })

      return
    }

    const sanitizedValue = sanitizeValue(value)

    setInputValue(sanitizedValue)

    const [, newHours, newMinutes] = COMPLETE_TIME_REG_EXP.exec(sanitizedValue) || []

    if (!newHours || !newMinutes) return

    onChange({ hours: newHours, minutes: newMinutes })
  }

  return (
    <div className={styles.wrapper}>
      <Input
        placeholder={computedPlaceholder}
        size={size}
        value={focus ? inputValue : sanitizeValue(getComplementedTime(hours, minutes))}
        ref={inputRef}
        suffixIcon={ClockIcon}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        onChange={handleInputChange}
        testPrefix={`${testPrefix}time-select-`}
      />
      {focus && (
        <TimeSelectList
          hours={getValidHours(hours)}
          minutes={getValidMinutes(minutes)}
          onChange={onTimeSelect}
          testPrefix={`${testPrefix}time-select-list-`}
        />
      )}
    </div>
  )
}
