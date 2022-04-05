import type { ComponentType } from 'react'

import type { TransitionProps } from '../Transitions/types'

/* All modals should support onSuccess/onCancel props */
export interface ModalProps {
  onSuccess: (result: any) => void
  onCancel: (result: any) => void
}

/* Options for openModal function */
export interface ModalOpenOptions<T = Record<string, any>> {
  timeout?: number
  noBackdrop?: boolean
  closeOnBackdropClick?: boolean
  props?: T
  animationContainer?: ComponentType
  modalTransition?: ComponentType<TransitionProps>
  backdropTransition?: ComponentType<TransitionProps>
}

/* All the information needed to render modal and animations */
export interface ModalContext {
  /* modal component and it's props, props are usualy not needed */
  component: ComponentType<ModalProps> | null

  /* all options for current modal open and close, current modal behavior */
  options: ModalOpenOptions

  /* flag that initiate enter and exit animations */
  in: boolean

  /*
     calling onSuccess initiate exit animation and resolve promise
     calling onCancel initiate exit animation and reject promise
  */
  onSuccess: (result: any) => void
  onCancel: (result: any) => void

  /*
    openModal creates modal and start enter animation,
    closeModal initiate exit animation
    removeModal kill modal, closeModal calls it itself
  */
  openModal: <T = Record<string, any>>(
    component: ComponentType<T & ModalProps>,
    options?: ModalOpenOptions<T>,
  ) => Promise<any>

  closeModal: (() => void) | null
  removeModal: (() => void) | null
}
