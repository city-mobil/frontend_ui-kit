import { useContext, useMemo } from 'react'

import { ThemeContext, ThemeManager } from './themeContext'

export const useTheme = (): ThemeContext => {
  const { changeTheme, theme } = useContext(ThemeManager)

  return useMemo(() => ({ theme, changeTheme }), [changeTheme, theme])
}
