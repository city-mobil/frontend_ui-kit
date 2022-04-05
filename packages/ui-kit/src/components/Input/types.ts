import { ChangeEvent } from 'react'

import { Size } from '../../types'

export type InputBaseAttributes = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'size' | 'value' | 'placeholder'
>

export interface InputOwnProps {
  value: string
  size?: Size
  placeholder?: string
  erroredBorder?: boolean
  errorTooltipText?: string
  isClearable?: boolean
  suffixIcon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  prefixIcon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  suffixIconContainerClassName?: string
  prefixIconContainerClassName?: string
  autoShowErrorTooltip?: boolean
  flat?: boolean
  onChange?: (value: string, event?: ChangeEvent<HTMLInputElement>) => void
  onSuffixIconClick?: (e: React.MouseEvent<HTMLDivElement>) => void
  testPrefix?: string
  rootId?: string
}

export type InputProps = InputBaseAttributes & InputOwnProps
