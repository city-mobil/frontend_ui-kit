import { createContext } from 'react'

import { Theme, ThemeName } from '../../generated/types'
import { noop } from '../../utils'

export interface ThemeContext {
  /**
   * Объект темы, включает в себя все стили темы. Поставляется в виде Object.freeze(theme).
   * Менять в рантайме его свойства нельзя.
   */
  theme: Theme | null
  changeTheme: (theme: ThemeName) => void
}

const defaultThemeContext: ThemeContext = {
  theme: null,
  changeTheme: noop,
}

export const ThemeManager = createContext<ThemeContext>(defaultThemeContext)
