import { ChangeEvent, ReactNode } from 'react'

type CheckboxBaseAttributes = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>

export interface CheckboxProps extends CheckboxBaseAttributes {
  checked: boolean
  indetermined?: boolean
  disabled?: boolean
  onChange?: (value: boolean, e?: ChangeEvent<HTMLInputElement>) => void
  label?: ReactNode
  className?: string
  testPrefix?: string
  disablePointerEvents?: boolean
}

export interface TextProps {
  disabled?: boolean
}
