import cx from 'classnames'
import React, { useEffect, useMemo, useRef, useState } from 'react'

import { useRunAfterUpdate } from '../../hooks'
import { Input } from '../Input'
import { COUNTRIES, RUSSIA_AND_KAZAKHSTAN_COUNTRY_CODE } from './constants'
import { CountrySelect } from './CoutrySelect'
import styles from './InputPhone.module.scss'
import { CountrySelectOption, InputPhoneProps } from './types'
import { formatPhoneNumber, getCountryByPhone, parsePhoneNumber } from './utils'

export const InputPhone = ({
  value,
  size = 'md',
  className = '',
  disabled = false,
  onChange,
  errorTooltipText = '',
  errorTooltipAutoshow = true,
  options = COUNTRIES,
}: InputPhoneProps): JSX.Element => {
  const [country, setCountry] = useState<CountrySelectOption>(() => getCountryByPhone(value, options))
  const [inputFocused, setInputFocused] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef<HTMLInputElement | null>(null)
  const runAfterUpdateRef = useRunAfterUpdate()

  const getResultCountry = (
    stateCountry: CountrySelectOption,
    parsedCountry: CountrySelectOption,
  ): CountrySelectOption => {
    if (
      parsedCountry.label === RUSSIA_AND_KAZAKHSTAN_COUNTRY_CODE &&
      stateCountry.label === RUSSIA_AND_KAZAKHSTAN_COUNTRY_CODE
    ) {
      return stateCountry
    }

    return parsedCountry
  }

  useEffect(() => {
    const parsedPhone = parsePhoneNumber(value, options)

    setCountry((stateCountry) => {
      const resultCountry = getResultCountry(stateCountry, parsedPhone.country)

      return resultCountry
    })
    setInputValue(parsedPhone.formattedPhone)
  }, [value, options])

  const onSelectFocus = (): void => {
    const parsedCountry = getCountryByPhone(value, options)
    setCountry(parsedCountry)
  }

  const onInputFocus = (): void => {
    let clearedPhone = value.replace(/([^0-9])*/g, '')
    const codeRegexp = new RegExp(`^${country?.label.slice(1)}`)
    clearedPhone = clearedPhone.replace(codeRegexp, '')
    const formattedPhone = formatPhoneNumber(clearedPhone, country.regexp)

    setInputValue(formattedPhone)
    setInputFocused(true)
  }

  const onInputBlur = (): void => {
    setInputFocused(false)
  }

  const handleChange = (country: CountrySelectOption, formattedPhone: string): void => {
    const code = country.label
    const number = `${formattedPhone.replace(/([^0-9])*/g, '')}`
    const phone = code.slice(1) + number

    onChange(phone, { code, number })
  }

  const onSelectChange = (country: CountrySelectOption | null): void => {
    if (!country) return

    const formattedNumber = formatPhoneNumber(inputValue, country.regexp)

    setCountry(country)
    handleChange(country, formattedNumber)

    // чтобы onInputFocus работал и применял маску ПОСЛЕ изменения value
    setTimeout(() => {
      if (!inputRef.current) return

      inputRef.current.focus()
    }, 0)
  }

  const onInputChange = (value: string): void => {
    if (!inputRef.current) return

    const caretPosition = inputRef.current.selectionStart || 1
    const beforeCaret = value.slice(0, caretPosition)
    const afterCaret = value.slice(caretPosition, value.length)
    const maskedBeforeCaret = formatPhoneNumber(beforeCaret, country.regexp)
    const newCaretPosition = maskedBeforeCaret.length
    const newInputValue = formatPhoneNumber(maskedBeforeCaret + afterCaret, country.regexp)

    setInputValue(newInputValue)

    runAfterUpdateRef.current = (): void => {
      if (!inputRef.current) return

      inputRef.current.selectionStart = newCaretPosition
      inputRef.current.selectionEnd = newCaretPosition
    }

    if (inputValue === newInputValue) return

    handleChange(country, newInputValue)
  }

  const { country: parsedCountry, formattedPhone: parsedFormattedPhone } = useMemo(() => {
    return parsePhoneNumber(value, options)
  }, [value, options])

  const resultCountry = getResultCountry(country, parsedCountry)
  const resultInputValue = inputFocused ? inputValue : parsedFormattedPhone

  return (
    <div className={cx(styles.container, className)}>
      <CountrySelect
        onChange={onSelectChange}
        value={resultCountry}
        size={size}
        disabled={disabled}
        onFocus={onSelectFocus}
        options={options}
        placeholder="Код страны"
      />

      <div className={styles.inputContainer}>
        <Input
          errorTooltipText={errorTooltipText}
          autoShowErrorTooltip={errorTooltipAutoshow}
          ref={inputRef}
          onFocus={onInputFocus}
          onBlur={onInputBlur}
          value={resultInputValue}
          onChange={onInputChange}
          size={size}
          placeholder="Номер телефона"
          disabled={disabled}
        />
      </div>
    </div>
  )
}
