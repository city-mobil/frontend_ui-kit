import { createContext } from 'react'

import { noop } from '../../utils'
import { Transitions } from '../Transitions'
import { ModalContainer } from './ModalContainer'
import { ModalContext, ModalOpenOptions } from './types'

export const defaultModalOptions: ModalOpenOptions = {
  props: {},
  timeout: 200,
  noBackdrop: false,
  closeOnBackdropClick: true,
  animationContainer: ModalContainer,
  modalTransition: Transitions.FadeInWithScale,
  backdropTransition: Transitions.FadeIn,
}

export const defaultModalContext: ModalContext = {
  component: null,
  options: defaultModalOptions,
  in: false,
  onSuccess: noop,
  onCancel: noop,
  openModal: (): Promise<any> => Promise.resolve(),
  closeModal: null,
  removeModal: null,
}

export const modalContext = createContext<ModalContext>(defaultModalContext)
