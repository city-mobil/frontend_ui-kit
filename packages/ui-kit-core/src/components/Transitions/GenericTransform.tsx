import React, { FC, PropsWithChildren, useLayoutEffect, useRef } from 'react'

import { TransitionProps } from './types'

export const commonTransitionStyles = {
  height: '100%',
  width: '100%',
}

type GenericTransformProps = TransitionProps & {
  start: { [key: string]: string }
  end: { [key: string]: string }
}

export const GenericTransform: FC<PropsWithChildren<GenericTransformProps>> = ({
  start,
  end,
  in: inProp,
  onEnter = (): null => null,
  onExit = (): null => null,
  timeout = 300,
  easing = 'linear',
  children,
}: PropsWithChildren<GenericTransformProps>) => {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const animatedContainer = ref.current

    if (!animatedContainer) return

    const finishCallback = inProp ? onEnter : onExit

    if (!animatedContainer.animate) {
      finishCallback()

      return
    }

    const enterTimeline = [start, end]
    const exitTimeline = [end, start]

    const timeline = inProp ? enterTimeline : exitTimeline
    const animation = animatedContainer.animate(timeline, { duration: timeout, easing: easing })

    if ('finished' in animation) {
      animation.finished.then(finishCallback).catch(() => animation.cancel())
    } else if ('onfinish' in animation) {
      animation.onfinish = finishCallback
    }

    return (): void => {
      if (animation.cancel) {
        animation.cancel()
      }
    }
  }, [inProp, easing, start, end, onEnter, onExit, timeout])

  return (
    <div ref={ref} style={{ ...commonTransitionStyles, ...(inProp ? end : start) }}>
      {children}
    </div>
  )
}
