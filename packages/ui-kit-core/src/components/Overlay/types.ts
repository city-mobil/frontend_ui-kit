import { Placement, State, VirtualElement } from '@popperjs/core'

import { PopperOptions, ReferenceElementType } from '../PopperWrapper'

export type OverlayEventName = keyof DocumentEventMap

export type OverlayTrigger = 'click' | 'hover'

export interface OverlayProps extends React.HTMLAttributes<HTMLElement> {
  referenceElement: ReferenceElementType | VirtualElement
  popoverClassName?: string
  arrowClassName?: string
  placement?: Placement
  arrow?: boolean
  popperOptions?: PopperOptions
  children?: React.ReactNode
  trigger: OverlayTrigger
  showOnLoad?: boolean
  rootId?: string
  closeOnOutsideClick?: boolean
  withPortal?: boolean
  onOpen?: () => void
  onClose?: () => void
}

export interface OverlayRef {
  show: () => void
  hide: () => void
  update: (() => Promise<Partial<State>>) | null
}
