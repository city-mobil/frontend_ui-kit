import React from 'react'
import { FormDemo } from './component'
import { ModalRoot, ModalProvider } from '@city/ui-kit-core'

export default {
  title: 'Pages/Form',
}

export const EmptyForm = (): JSX.Element => (
  <ModalProvider>
    <FormDemo empty />
    <ModalRoot />
  </ModalProvider>
)

export const FilledForm = (): JSX.Element => (
  <ModalProvider>
    <FormDemo />
    <ModalRoot />
  </ModalProvider>
)
