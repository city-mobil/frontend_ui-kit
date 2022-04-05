import { OverlayTrigger, PopperOptions } from '@city/ui-kit-core'
import { Placement, VirtualElement } from '@popperjs/core'
import { ReactNode } from 'react'

export interface TooltipBaseProps {
  type?: 'error' | 'regular'
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

export interface TooltipPropsWithTargetId extends TooltipBaseProps {
  targetId: string
}

export interface TooltipPropsWithVirtualTarget extends TooltipBaseProps {
  virtualTarget: VirtualElement
}

export type TooltipProps = TooltipPropsWithTargetId | TooltipPropsWithVirtualTarget
