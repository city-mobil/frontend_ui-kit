import { PopperOptions } from '@city/ui-kit-core'

export const DEFAULT_TOOLTIP_OFFSET = {
  name: 'offset',
  options: {
    offset: [0, 8],
  },
} as const

export const DEFAULT_POPPER_OPTIONS: NonNullable<PopperOptions> = {}
