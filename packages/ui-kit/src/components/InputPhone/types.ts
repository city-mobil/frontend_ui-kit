import { SVGProps } from 'react'

import { Size } from '../../types'
import { SelectBaseOption } from '../Selects'
import { ABBREVIATIONS } from './constants'

export type CountryName = keyof typeof ABBREVIATIONS
export type CountryAbbreviation = typeof ABBREVIATIONS[CountryName]

export interface CountrySelectOption extends SelectBaseOption {
  value: CountryAbbreviation
  label: string
  country: string
  Flag: React.FC<SVGProps<SVGSVGElement>>
  regexp: RegExp
}

export interface Phone {
  code: string
  number: string
}

export interface InputPhoneProps {
  value: string
  size?: Size
  className?: string
  disabled?: boolean
  onChange: (value: string, phone?: Phone) => void
  errorTooltipText?: string
  errorTooltipAutoshow?: boolean
  options?: CountrySelectOption[]
}
