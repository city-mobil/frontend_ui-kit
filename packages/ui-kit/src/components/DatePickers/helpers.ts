import { add, format, isValid, parse } from 'date-fns'
import { ru } from 'date-fns/esm/locale'

import { INPUT_DATE_FORMAT, INVALID_DATE, MIN_DATE_PICKER_DATE, VALUE_DATE_FORMAT } from './constants'

export const dateToString = (date?: Date | null): string => {
  return date ? format(date, INPUT_DATE_FORMAT) : ''
}

export const stringToDate = (stringDate: string): Date | null => {
  const date = parse(stringDate, INPUT_DATE_FORMAT, new Date())

  return isValid(date) && date >= MIN_DATE_PICKER_DATE ? date : null
}

const DD_MM_YYYY_LENGTH = 10
const DOT_POSITIONS = [2, 5]

export const maskValue = (str: string): string => {
  const result = []
  const strArray = str.split('')

  for (let i = 0; i < strArray.length; ++i) {
    if (result.length === DOT_POSITIONS[0] || result.length === DOT_POSITIONS[1]) {
      result.push('.')
    }

    const char = strArray[i]

    if (Number.isInteger(parseInt(char, 10))) {
      result.push(char)
    }

    if (result.length === DD_MM_YYYY_LENGTH) {
      break
    }
  }

  return result.join('')
}

export const formatValue = (value = '', inputFocused: boolean): string => {
  const date = parse(value, INPUT_DATE_FORMAT, new Date())

  if (inputFocused) {
    return maskValue(value)
  }

  if (value === '') {
    return value
  }

  if (!isValid(date) || date < MIN_DATE_PICKER_DATE) {
    return INVALID_DATE
  }

  return format(date, VALUE_DATE_FORMAT, { locale: ru })
}

export const isSameMonth = (d1: Date, d2: Date): boolean => {
  return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth()
}

export const getToMonth = (fromDate: Date | null, toDate: Date | null): Date => {
  if (!toDate && fromDate) {
    return fromDate
  }

  if (fromDate && toDate) {
    return isSameMonth(fromDate, toDate) ? fromDate : add(toDate, { months: -1 })
  }

  return new Date()
}

type NullableDate = Date | null
type compareDatesType = 'max' | 'min'

const compareDates = (firstDate: NullableDate, lastDate: NullableDate, type: compareDatesType): NullableDate => {
  if (firstDate === null && lastDate) return lastDate

  if (lastDate === null && firstDate) return firstDate

  if (type === 'max') {
    return Number(firstDate) - Number(lastDate) > 0 ? firstDate : lastDate
  }

  return Number(firstDate) - Number(lastDate) < 0 ? firstDate : lastDate
}

export const getMinMaxDate = (dates: NullableDate[], type: compareDatesType): NullableDate => {
  if (dates.length === 0) return null

  if (dates.length === 1) return dates[0]

  let tempDate = dates[0]

  for (const date of dates) {
    if (!date) continue

    const comparedDate = compareDates(tempDate, date, type)

    if (!comparedDate) continue

    tempDate = compareDates(tempDate, date, type)
  }

  return tempDate
}
