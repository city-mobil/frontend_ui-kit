import { ModalProvider, ModalRoot, OverlayRoot, ThemeProvider, ThemeProviderProps } from '@city/ui-kit-core'
import React, { PropsWithChildren } from 'react'

import { Toast } from '../Toast'

export const UIKitProvider = ({ children, initialTheme }: PropsWithChildren<ThemeProviderProps>): JSX.Element => {
  return (
    <ThemeProvider initialTheme={initialTheme}>
      <ModalProvider>
        {children}
        <ModalRoot />
      </ModalProvider>
      <OverlayRoot />
      <Toast />
    </ThemeProvider>
  )
}
