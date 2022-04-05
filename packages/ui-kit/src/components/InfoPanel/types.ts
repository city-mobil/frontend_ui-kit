import { ButtonBaseProps } from '../Buttons'
import type { InfoIcons } from './assets'

// нельзя делать extend от ButtonProps, тк на данном этапе неизвестно, чем окажется ButtonProps: ButtonBaseProps или ButtonAnchorProps
export interface InfoPanelButtonProps extends ButtonBaseProps {
  name?: string
  isHidden?: boolean
}

export type InfoPanelIcons = keyof typeof InfoIcons

export interface InfoPanelBaseProps {
  title: string
  content: string
  button?: InfoPanelButtonProps
  variant?: 'error' | 'normal'
  icon: InfoPanelIcons
  className?: string
}

export type InfoPanelProps = Omit<InfoPanelBaseProps, 'icon'>
