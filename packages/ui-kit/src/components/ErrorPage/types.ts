import { ButtonBaseProps } from '../Buttons'
import type { ErrorIcons } from './assets'

// нельзя делать extend от ButtonProps, тк на данном этапе неизвестно, чем окажется ButtonProps: ButtonBaseProps или ButtonAnchorProps
export interface ErrorPageButtonProps extends ButtonBaseProps {
  name?: string
  isHidden?: boolean
}

export type ErrorsPageIconsType = keyof typeof ErrorIcons

export interface ErrorPageBaseProps {
  title: string
  content: string
  button?: ErrorPageButtonProps
  icon: ErrorsPageIconsType
  className?: string
}

export type ErrorPageProps = Omit<ErrorPageBaseProps, 'icon'>
