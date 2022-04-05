import { useCallback, useRef } from 'react'

const DEFAULT_DELAY = 250

type fnType<T> = (args: T) => void

export const useThrottle = <T>(fn: fnType<T>, wait = DEFAULT_DELAY): fnType<T> => {
  const then = useRef<number>(performance.now())

  const debouncedFn: fnType<T> = (args) => {
    const now = performance.now()
    const elapsed = now - then.current

    if (elapsed > wait) {
      fn(args)
      then.current = now
    }
  }

  return useCallback<fnType<T>>(debouncedFn, [fn, then, wait])
}
