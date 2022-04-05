import { useCallback, useState } from 'react'

type UseRendered = (state: boolean) => [boolean, () => void]
/**
 * может быть использован для lazyLoad'a компонента
 */
export const useRendered: UseRendered = (state) => {
  const [isComplete, setIsComplete] = useState(state)

  const handler = useCallback((): void => {
    if (isComplete) return

    setIsComplete(true)
  }, [isComplete])

  return [isComplete, handler]
}
