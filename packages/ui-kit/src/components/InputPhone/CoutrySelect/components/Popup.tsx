import { OverlayRef } from '@city/ui-kit-core'
import React, { forwardRef } from 'react'

import { Popover } from '../../../Popover'
import { SelectPopupProps, useSelectContext } from '../../../Selects'
import { POPPER_OPTIONS } from './constants'

export const Popup = forwardRef<OverlayRef, SelectPopupProps>(({ children }, ref) => {
  const { popperOptions, ...restPopupProps } = useSelectContext().popupProps

  return (
    <Popover {...restPopupProps} popperOptions={POPPER_OPTIONS} ref={ref}>
      {children}
    </Popover>
  )
})

Popup.displayName = 'Popup'
