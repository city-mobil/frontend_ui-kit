import { useCallback, useMemo, useState } from 'react'

export interface UseDatePickerInputStateReturn {
  inputFocused: boolean
  onFocus: () => void
  onBlur: () => void
}

export const useDatePickerInputState = (handleFocus?: () => void): UseDatePickerInputStateReturn => {
  const [inputFocused, setInputFocused] = useState(false)

  const onFocus = useCallback(() => {
    setInputFocused(true)
    if (handleFocus) {
      handleFocus()
    }
  }, [handleFocus])

  const onBlur = useCallback(() => {
    setInputFocused(false)
  }, [])

  const result = useMemo(
    () => ({
      inputFocused,
      onFocus,
      onBlur,
    }),
    [inputFocused, onFocus, onBlur],
  )

  return result
}
