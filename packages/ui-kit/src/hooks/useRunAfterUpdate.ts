import { MutableRefObject, useLayoutEffect, useRef } from 'react'

type CallbackFn = () => void

export const useRunAfterUpdate = (): MutableRefObject<CallbackFn | null> => {
  const runAfterUpdateRef = useRef<CallbackFn | null>(null)

  useLayoutEffect(() => {
    if (runAfterUpdateRef.current) {
      runAfterUpdateRef.current()
      runAfterUpdateRef.current = null
    }
  })

  return runAfterUpdateRef
}
