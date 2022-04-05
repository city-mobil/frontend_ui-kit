import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react'

import { OVERLAY_ROOT_ID } from '../../constants'
import { useEventListener, useRendered } from '../../hooks'
import { noop } from '../../utils'
import { DEFAULT_POPPER_OPTIONS, PopperWrapper, PopperWrapperRef } from '../PopperWrapper'
import { Portal } from '../Portal'
import { OVERLAY_CLOSE_TIMEOUT, triggerToEventsMap } from './constants'
import { isValidDOMElement } from './helpers'
import { OverlayEventName, OverlayProps, OverlayRef } from './types'

export const Overlay = forwardRef<OverlayRef, OverlayProps>((props, ref) => {
  const {
    children,
    popoverClassName,
    arrowClassName,
    placement = 'top',
    arrow = false,
    popperOptions = DEFAULT_POPPER_OPTIONS,
    trigger,
    showOnLoad = false,
    referenceElement,
    rootId = OVERLAY_ROOT_ID,
    closeOnOutsideClick = true,
    withPortal = true,
    onOpen = noop,
    onClose = noop,
    ...rest
  } = props
  const [isVisible, setIsVisible] = useState(showOnLoad)
  const [isRendered, setIsRendered] = useRendered(showOnLoad)
  const timeoutId = useRef<number>(0)
  const popoverHovered = useRef<boolean>(false)
  const [popperRef, setPopperRef] = useState<PopperWrapperRef | null>(null)
  const closedByGlobalClick = useRef(false)

  const show = useCallback((): void => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current)
    }

    setIsVisible(true)
    setIsRendered()
    onOpen()
  }, [onOpen, setIsRendered])

  const hide = useCallback((): void => {
    if (trigger === 'click') {
      setIsVisible(false)
      onClose()

      return
    }

    if (timeoutId.current) {
      clearTimeout(timeoutId.current)
    }

    timeoutId.current = window.setTimeout(() => {
      if (popoverHovered.current) return

      setIsVisible(false)
      onClose()
    }, OVERLAY_CLOSE_TIMEOUT)
  }, [onClose, trigger])

  const handlePopperMouseEnter = useCallback((): void => {
    popoverHovered.current = true
  }, [])

  const handlePopperMouseLeave = useCallback((): void => {
    popoverHovered.current = false

    if (trigger === 'click' || !isValidDOMElement(referenceElement)) return

    hide()
  }, [hide, referenceElement, trigger])

  const handleTrigger = useCallback(
    (event: Event) => {
      switch (event.type as OverlayEventName) {
        case 'focusin': {
          if (closedByGlobalClick.current) {
            closedByGlobalClick.current = false

            break
          }

          show()
          break
        }

        case 'focusout': {
          if (popoverHovered.current || !closeOnOutsideClick) break

          hide()
          break
        }

        case 'mouseenter': {
          if (trigger === 'click') return

          show()
          break
        }

        case 'mouseleave': {
          if (trigger === 'click') return

          hide()
          break
        }
      }
    },
    [closeOnOutsideClick, hide, show, trigger],
  )

  const handleGlobalClick = useCallback(
    (event: Event) => {
      if (trigger !== 'click' || !isValidDOMElement(referenceElement)) return

      if (popperRef?.contains(event.target as Node)) return

      const isOnReferenceElement = isValidDOMElement(referenceElement)
        ? referenceElement.contains(event.target as Node)
        : false

      const handler = isOnReferenceElement && !isVisible ? show : hide

      if (isVisible && !closeOnOutsideClick && !isOnReferenceElement) return

      closedByGlobalClick.current = isOnReferenceElement && isVisible

      handler()
    },
    [closeOnOutsideClick, hide, isVisible, popperRef, referenceElement, show, trigger],
  )

  useEventListener({
    eventNames: triggerToEventsMap[trigger],
    handler: handleTrigger,
    element: isValidDOMElement(referenceElement) ? referenceElement : null,
  })
  useEventListener({
    eventNames: ['mousedown'],
    handler: handleGlobalClick,
    isGlobal: true,
  })

  useEffect(() => {
    if (!isRendered || !popperRef || !('addEventListener' in popperRef)) return

    popperRef.addEventListener('mouseenter', handlePopperMouseEnter)
    popperRef.addEventListener('mouseleave', handlePopperMouseLeave)

    return (): void => {
      popperRef.removeEventListener('mouseenter', handlePopperMouseEnter)
      popperRef.removeEventListener('mouseleave', handlePopperMouseLeave)
    }
  }, [handlePopperMouseEnter, handlePopperMouseLeave, isRendered, popperRef])

  useImperativeHandle(
    ref,
    () => ({
      show,
      hide,
      update: popperRef?.update || null,
    }),
    [hide, popperRef, show],
  )

  return (
    <Portal rootId={rootId} enable={withPortal}>
      {isRendered && (
        <PopperWrapper
          isRendered={isRendered}
          isShow={isVisible}
          referenceElement={referenceElement}
          popoverClassName={popoverClassName}
          arrowClassName={arrowClassName}
          placement={placement}
          arrow={arrow}
          popperOptions={popperOptions}
          ref={setPopperRef}
          {...rest}
        >
          {children}
        </PopperWrapper>
      )}
    </Portal>
  )
})

Overlay.displayName = 'Overlay'
