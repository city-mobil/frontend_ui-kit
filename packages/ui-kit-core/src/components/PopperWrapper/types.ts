import { createPopper, Options, Placement, State, VirtualElement } from '@popperjs/core'
import { ReactNode } from 'react'
import { Modifier } from 'react-popper'

export type PopperOptions = Omit<Partial<Options>, 'modifiers' | 'placement'> & {
  createPopper?: typeof createPopper
  modifiers?: ReadonlyArray<Modifier<unknown>>
}

export type PopperElementType = HTMLElement | null

export type ReferenceElementType = HTMLElement | SVGElement | null

export interface PopperWrapperProps extends React.HTMLAttributes<HTMLElement> {
  referenceElement: ReferenceElementType | VirtualElement
  isRendered: boolean
  isShow: boolean
  popoverClassName?: string
  arrowClassName?: string
  placement?: Placement
  arrow?: boolean
  popperOptions?: PopperOptions
  children?: ReactNode
}

export type PopperWrapperRef = PopperElementType & { update?: (() => Promise<Partial<State>>) | null }
