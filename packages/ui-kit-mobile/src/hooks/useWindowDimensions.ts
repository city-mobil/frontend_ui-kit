import { useEffect, useState } from 'react'

import { Dimensions } from './types'

export type UseWindowDimensionsReturnType = Dimensions

/**
 * Отслеживает резайс экрана (окна).
 * @returns текущие размеры окна
 */
export const useWindowDimensions = (): UseWindowDimensionsReturnType => {
  const [dimensions, setDimensions] = useState<Dimensions>({ width: window.innerWidth, height: window.innerHeight })

  useEffect(() => {
    const listener = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight })
    }

    window.addEventListener('resize', listener)

    return () => {
      window.removeEventListener('resize', listener)
    }
  }, [])

  return dimensions
}
