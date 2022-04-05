import { useEffect, useRef } from 'react'

import { noop } from '../utils'

type Handler = (event: Event) => void

export interface useEventListenerParams {
  eventNames: string[]
  handler?: Handler
  element?: HTMLElement | SVGElement | null
  options?: AddEventListenerOptions
  isGlobal?: boolean
}

export const useEventListener = ({
  eventNames,
  handler = noop,
  element,
  options = {},
  isGlobal = false,
}: useEventListenerParams): void => {
  const savedHandler = useRef<Handler>(handler)

  useEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(() => {
    const targetElement = isGlobal ? document : element

    if (!targetElement) return

    const listener = (event: Event): void => {
      if (!targetElement || !event.target) {
        return
      }

      savedHandler.current(event)
    }

    for (const event of eventNames) {
      targetElement.addEventListener(event, listener, options)
    }

    return (): void => {
      for (const event of eventNames) {
        targetElement.removeEventListener(event, listener)
      }
    }
  }, [element, eventNames, options, isGlobal])
}
