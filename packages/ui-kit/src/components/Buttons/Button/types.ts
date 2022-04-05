import React from 'react'

import { Size } from '../../../types'

export interface ButtonOwnProps {
  variant?: 'primary' | 'secondary' | 'flat'
  size?: Size
  disabled?: boolean
  fullWidth?: boolean
  className?: string
  testPrefix?: string
  loading?: boolean
}

export type ButtonBaseAttributes = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>

export interface ButtonBaseProps extends ButtonOwnProps, ButtonBaseAttributes {
  type?: 'button' | 'reset' | 'submit'
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void

  href?: never
  target?: never
}

export type ButtonLinkBaseAttributes = React.AnchorHTMLAttributes<HTMLAnchorElement>

export interface ButtonLinkProps extends ButtonOwnProps, ButtonLinkBaseAttributes {
  href?: string
  target?: string
}

export type ButtonProps = ButtonBaseProps | ButtonLinkProps
