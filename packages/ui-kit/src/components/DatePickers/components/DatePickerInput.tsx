import cx from 'classnames'
import React, { ChangeEvent, forwardRef } from 'react'

import { ReactComponent as SvgCalendar } from '../../../assets/svg/ic_calendar.svg'
import { Size } from '../../../types'
import { Input } from '../../Input'
import { formatValue } from '../helpers'
import styles from './DatePickerInput.module.scss'

interface IDatePickerInputProps {
  placeholder: string
  inputFocused: boolean
  size: Size
  onInputChange: (event: React.SyntheticEvent<HTMLInputElement>) => void
  onBlur: (event: React.SyntheticEvent<HTMLInputElement>) => void
  onFocus: (event: React.SyntheticEvent<HTMLInputElement>) => void
  fromDateInput?: boolean
  inputValue?: string
  leftSquareBorder?: boolean
  rightSquareBorder?: boolean
}

export const DatePickerInput = forwardRef((props: IDatePickerInputProps, ref: React.Ref<HTMLInputElement>) => {
  const {
    size,
    inputFocused,
    placeholder,
    inputValue,
    onInputChange,
    leftSquareBorder,
    rightSquareBorder,
    ...otherProps
  } = props
  const formattedValue = formatValue(inputValue, inputFocused)
  const handleChange = (_value: string, event?: ChangeEvent<HTMLInputElement>): void => {
    if (!event) return

    onInputChange(event)
  }

  return (
    <div className={styles.container}>
      <Input
        {...otherProps}
        className={cx({
          [styles.input__rightSquareBorder]: rightSquareBorder,
          [styles.input__leftSquareBorder]: leftSquareBorder,
        })}
        onChange={handleChange}
        size={size}
        placeholder={placeholder}
        value={formattedValue}
        ref={ref}
        suffixIcon={SvgCalendar}
      />
    </div>
  )
})

DatePickerInput.displayName = 'DatePickerInput'
