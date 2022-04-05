import { ButtonHTMLAttributes, FunctionComponent, MouseEvent, SVGProps } from 'react'

import { Size } from '../../../types'

type IconButtonSize = Exclude<Size, 'lg'>

type IconButtonBaseAttributes = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>

export interface IconButtonProps extends IconButtonBaseAttributes {
  size?: IconButtonSize
  disabled?: boolean
  fullWidth?: boolean
  className?: string
  icon: FunctionComponent<SVGProps<SVGSVGElement>>
  title?: string
  type?: 'button' | 'reset' | 'submit'
  testPrefix?: string
  id?: string
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
}
