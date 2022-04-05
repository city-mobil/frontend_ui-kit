import { CSSProperties } from 'react'

import { ColorName, FontWeight } from './types'

export const getColorName = (colorName?: ColorName): CSSProperties => {
  if (!colorName) return {}

  return {
    color: `var(--${colorName}, inherit)`,
  }
}

export const getFontWeight = (fontWeight?: FontWeight): CSSProperties => {
  switch (fontWeight) {
    case 'bold': {
      return { fontWeight: 700 }
    }

    case 'medium': {
      return { fontWeight: 500 }
    }

    case 'regular':
    default: {
      return {}
    }
  }
}
