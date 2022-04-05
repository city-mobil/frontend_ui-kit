import { OverlayTrigger, PopperOptions } from '@city/ui-kit-core'
import { Placement, VirtualElement } from '@popperjs/core'
import { ReactNode } from 'react'

export interface PopoverBaseProps extends React.HTMLAttributes<HTMLElement> {
  children?: ReactNode
  placement?: Placement
  arrow?: boolean
  showOnLoad?: boolean
  className?: string
  popperOptions?: PopperOptions
  trigger?: OverlayTrigger
  rootId?: string
  closeOnOutsideClick?: boolean
  withPortal?: boolean
  onOpen?: () => void
  onClose?: () => void
}

export interface PopoverPropsWithTargetId extends PopoverBaseProps {
  targetId: string
}

export interface PopoverPropsWithVirtualTarget extends PopoverBaseProps {
  virtualTarget: VirtualElement
}

export type PopoverProps = PopoverPropsWithTargetId | PopoverPropsWithVirtualTarget
