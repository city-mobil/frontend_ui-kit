import React from 'react'
import { useTheme } from '@city/ui-kit-core'
import figmaScreenshot from '../../assets/img/semantic.png'

export const SemanticColors = () => {
  const themeStr = JSON.stringify(useTheme().theme, null, 2).replace(/,/g, ',\n')

  return <code style={{ whiteSpace: 'pre' }}>{themeStr}</code>
}

export const Figma = () => <img src={figmaScreenshot} style={{ width: '200px' }} />
