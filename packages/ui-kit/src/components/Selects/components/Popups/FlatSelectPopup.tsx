import { OverlayRef } from '@city/ui-kit-core'
import React, { forwardRef } from 'react'

import { Popover } from '../../../Popover'
import { FLAT_SELECT_POPPER_OPTIONS } from '../../constants'
import { useSelectContext } from '../../context'
import { SelectPopupProps } from '../../types'

export const FlatSelectPopup = forwardRef<OverlayRef, SelectPopupProps>(({ children }, ref) => {
  const { popupProps } = useSelectContext()
  const { popperOptions, ...restPopupProps } = popupProps

  return (
    <Popover {...restPopupProps} popperOptions={FLAT_SELECT_POPPER_OPTIONS} ref={ref}>
      {children}
    </Popover>
  )
})

FlatSelectPopup.displayName = 'FlatSelectPopup'
