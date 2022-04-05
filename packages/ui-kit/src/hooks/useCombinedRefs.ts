import { MutableRefObject, useEffect, useRef } from 'react'

type Ref<T> = ((instance: T | null) => void) | MutableRefObject<T | null> | null

export const useCombinedRefs = <T>(...refs: Ref<T>[]): MutableRefObject<T | null> => {
  const targetRef = useRef<T>(null)

  useEffect(() => {
    refs.forEach((ref) => {
      if (!ref) return

      if (typeof ref === 'function') {
        ref(targetRef.current)
      } else {
        ref.current = targetRef.current
      }
    })
  }, [refs])

  return targetRef
}
