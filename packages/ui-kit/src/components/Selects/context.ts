import { createContext, useContext } from 'react'

import { DEFAULT_SELECT_CONTEXT_VALUE } from './constants'
import { SelectBaseOption, SelectContextValue } from './types'

export const SelectContext = createContext<SelectContextValue>(DEFAULT_SELECT_CONTEXT_VALUE)

export const useSelectContext = <
  IsMulty extends boolean | null = null,
  T extends SelectBaseOption = SelectBaseOption,
  E extends HTMLElement = HTMLElement,
>(): SelectContextValue<IsMulty, T, E> => {
  return useContext(SelectContext) as unknown as SelectContextValue<IsMulty, T, E>
}
