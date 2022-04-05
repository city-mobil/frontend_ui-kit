import { ABBREVIATIONS, COUNTRIES_MAP } from './constants'
import { CountrySelectOption } from './types'

const RUSSIA = COUNTRIES_MAP[ABBREVIATIONS.russia]
const KAZAKHSTAN = COUNTRIES_MAP[ABBREVIATIONS.kazakhstan]

export const getCountryByPhone = (phone: string, avaliableCountries: CountrySelectOption[]): CountrySelectOption => {
  const clearedValue = phone.replace(/([^0-9])*/g, '')

  if (clearedValue.startsWith('7')) {
    const isKaz = clearedValue.startsWith('76') || clearedValue.startsWith('77')

    return isKaz ? KAZAKHSTAN : RUSSIA
  }

  return avaliableCountries.find((country) => country.label === `+${clearedValue.slice(0, 3)}`) || avaliableCountries[0]
}

export const formatPhoneNumber = (phone: string, countryPhoneNumberRegexp: RegExp): string => {
  let buffer = phone.replace(/([^0-9])*/g, '')

  const [, operatorCode, firstDigitGroup, secondDigitGroup, lastDigitGroup] =
    countryPhoneNumberRegexp.exec(buffer) || []

  let formattedPhone = ''

  if (operatorCode) {
    formattedPhone += operatorCode
    const partToRemove = new RegExp(`^${operatorCode}`)
    buffer = buffer.replace(partToRemove, '')

    if (buffer.length > 0) {
      formattedPhone += ' '
    }
  }

  if (firstDigitGroup) {
    formattedPhone += firstDigitGroup
    const partToRemove = new RegExp(`^${firstDigitGroup}`)
    buffer = buffer.replace(partToRemove, '')

    if (buffer.length > 0) {
      formattedPhone += '-'
    }
  }

  if (secondDigitGroup) {
    formattedPhone += secondDigitGroup
    const partToRemove = new RegExp(`^${secondDigitGroup}`)
    buffer = buffer.replace(partToRemove, '')

    if (buffer.length > 0) {
      formattedPhone += '-'
    }
  }

  if (lastDigitGroup) {
    formattedPhone += lastDigitGroup
    buffer = ''
  }

  return formattedPhone + buffer
}

export interface ParsePhoneNumberReturn {
  country: CountrySelectOption
  formattedPhone: string
}

export const parsePhoneNumber = (phone: string, avaliableCountries: CountrySelectOption[]): ParsePhoneNumberReturn => {
  let clearedPhone = phone.replace(/([^0-9])*/g, '')

  const country = getCountryByPhone(phone, avaliableCountries)
  const codeRegexp = new RegExp(`^${country.label.slice(1)}`)
  clearedPhone = clearedPhone.replace(codeRegexp, '')

  const formattedPhone = formatPhoneNumber(clearedPhone, country.regexp)

  return {
    country,
    formattedPhone,
  }
}
