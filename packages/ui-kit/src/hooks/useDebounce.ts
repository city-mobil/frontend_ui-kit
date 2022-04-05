import { useCallback, useEffect, useRef } from 'react'

const DEFAULT_DELAY = 250

type fnType<T> = (args: T) => void

export const useDebounce = <T>(fn: fnType<T>, wait = DEFAULT_DELAY): fnType<T> => {
  const timerRef = useRef<number>(0)

  const debouncedFn: fnType<T> = (args) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    timerRef.current = window.setTimeout(() => {
      fn(args)
    }, wait)
  }

  useEffect(() => {
    return (): void => {
      clearTimeout(timerRef.current)
    }
  }, [])

  return useCallback<fnType<T>>(debouncedFn, [fn, wait])
}
