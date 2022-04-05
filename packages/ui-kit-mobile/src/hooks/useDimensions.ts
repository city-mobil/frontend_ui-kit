import { RefObject, useEffect, useRef, useState } from 'react'

import { Dimensions } from './types'

export type UseDimensionsReturnType<T> = { ref: RefObject<T> } & Dimensions

const initialDimensions: Dimensions = { width: 0, height: 0 }

/**
 * Отслеживает резайс элемента по ref.
 *
 * ВАЖНО! Хук использует ResizeObserver, поэтому нужно использовать polyfill
 * для корректной работы во всех браузерах.
 *
 * Установите пакет `@juggle/resize-observer` и добавьте:
 *
 * ```tsx
 * import { ResizeObserver as ResizeObserverPolyfill } from '@juggle/resize-observer'
 *
 * if (typeof window.ResizeObserver !== 'function') {
 *   window.ResizeObserver = ResizeObserverPolyfill
 * }
 * ```
 *
 * @returns текущие размеры элемента и объект ref
 */
export const useDimensions = <T extends HTMLElement>(): UseDimensionsReturnType<T> => {
  const ref = useRef<T>(null)

  const [dimensions, setDimensions] = useState<Dimensions>(initialDimensions)

  useEffect(() => {
    if (!ref.current) {
      return
    }

    const resizeObserver = new window.ResizeObserver((entries: ResizeObserverEntry[]) => {
      const width = entries?.[0]?.contentRect?.width || 0
      const height = entries?.[0]?.contentRect?.height || 0

      setDimensions({ width, height })
    })

    resizeObserver.observe(ref.current)

    return (): void => resizeObserver.disconnect()
  }, [])

  return { ref, ...dimensions }
}
