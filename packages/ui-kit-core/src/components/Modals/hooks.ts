import { useContext } from 'react'

import { modalContext } from './modalContext'
import { ModalContext } from './types'

export interface UseModalReturnType {
  openModal: ModalContext['openModal']
  closeModal: ModalContext['closeModal']
  removeModal: ModalContext['removeModal']
}

export const useModal = (): UseModalReturnType => {
  const context = useContext<ModalContext>(modalContext)

  return {
    openModal: context.openModal,
    closeModal: context.closeModal,
    removeModal: context.removeModal,
  }
}
