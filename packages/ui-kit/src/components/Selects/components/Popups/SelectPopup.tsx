import { OverlayRef } from '@city/ui-kit-core'
import React, { forwardRef } from 'react'

import { Popover } from '../../../Popover'
import { useSelectContext } from '../../context'
import { SelectPopupProps } from '../../types'

export const SelectPopup = forwardRef<OverlayRef, SelectPopupProps>(({ children }, ref) => {
  const { popupProps } = useSelectContext()

  return (
    <Popover {...popupProps} ref={ref}>
      {children}
    </Popover>
  )
})

SelectPopup.displayName = 'SelectPopup'
