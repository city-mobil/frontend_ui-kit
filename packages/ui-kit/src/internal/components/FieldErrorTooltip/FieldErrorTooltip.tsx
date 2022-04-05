import { OverlayRef, PopperOptions } from '@city/ui-kit-core'
import React, { forwardRef, PropsWithChildren, useMemo } from 'react'

import { Tooltip } from '../../../components/Tooltip'
import { Size } from '../../../types'
import { FIELD_ERROR_TOOLTIP_SKIDDING } from './constants'

export interface FieldErrorTooltip2Props {
  targetId: string
  size: Size
  rootId?: string
}

export const FieldErrorTooltip = forwardRef<OverlayRef, PropsWithChildren<FieldErrorTooltip2Props>>(
  ({ targetId, size, rootId, children }, ref): JSX.Element => {
    const popperOptions: PopperOptions = useMemo(
      () => ({
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [FIELD_ERROR_TOOLTIP_SKIDDING[size], 8],
            },
          },
        ],
      }),
      [size],
    )

    return (
      <Tooltip type="error" targetId={targetId} popperOptions={popperOptions} ref={ref} rootId={rootId}>
        {children}
      </Tooltip>
    )
  },
)

FieldErrorTooltip.displayName = 'FieldErrorTooltip'
