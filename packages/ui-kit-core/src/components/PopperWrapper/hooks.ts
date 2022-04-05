import { VirtualElement } from '@popperjs/core'
import { MutableRefObject, RefObject, useCallback, useRef } from 'react'

import { noop } from '../../utils'
import { OverlayRef } from '../Overlay'

const generateGetBoundingClientRect = (x = 0, y = 0) => {
  return (): DOMRect => ({
    width: 0,
    height: 0,
    top: y,
    right: x,
    bottom: y,
    left: x,
    x,
    y,
    toJSON: noop,
  })
}

export interface UseVirtualElementReturn {
  virtualElement: MutableRefObject<VirtualElement>
  updateVirtualElement: (x: number, y: number) => void
}

export const useVirtualElement = (overlayRef: RefObject<OverlayRef>): UseVirtualElementReturn => {
  const virtualElement = useRef<VirtualElement>({
    getBoundingClientRect: generateGetBoundingClientRect(),
  })

  const updateVirtualElement = useCallback(
    (x: number, y: number) => {
      virtualElement.current.getBoundingClientRect = generateGetBoundingClientRect(x, y)

      if (!overlayRef.current?.update) return

      void overlayRef.current.update()
    },
    [overlayRef],
  )

  return {
    virtualElement,
    updateVirtualElement,
  }
}
