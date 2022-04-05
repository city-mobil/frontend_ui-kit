import React, { useEffect, useRef, useState } from 'react'

import { themes } from '../../generated/themes'
import { ThemeName } from '../../generated/types'
import { ThemeContext, ThemeManager } from './themeContext'

/**
 * Массив названий всех тем
 */
export const THEME_NAMES = Object.keys(themes)

export interface ThemeProviderProps {
  initialTheme?: ThemeName
}

export const ThemeProvider = ({
  initialTheme = 'Blueberry',
  children,
}: React.PropsWithChildren<ThemeProviderProps>): JSX.Element => {
  const [themeName, setThemeName] = useState<ThemeName>(initialTheme)
  const bodyRef = useRef(document.body)
  const activeTheme = Object.freeze(themes[themeName])

  const contextValue: ThemeContext = {
    theme: activeTheme,
    changeTheme: setThemeName,
  }

  useEffect(() => {
    bodyRef.current.classList.remove(...THEME_NAMES)
    bodyRef.current.classList.add(themeName)
  }, [themeName])

  return <ThemeManager.Provider value={contextValue}>{children}</ThemeManager.Provider>
}
