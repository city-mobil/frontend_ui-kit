import cx from 'classnames'
import React, { forwardRef, useCallback, useMemo, useState } from 'react'
import { usePopper } from 'react-popper'

import { DEFAULT_POPPER_OPTIONS } from './constants'
import styles from './PopperWrapper.module.scss'
import { PopperElementType, PopperOptions, PopperWrapperProps, PopperWrapperRef } from './types'

export const PopperWrapper = forwardRef<PopperWrapperRef, PopperWrapperProps>((props, ref) => {
  const {
    children,
    isRendered,
    isShow,
    referenceElement,
    popoverClassName,
    arrowClassName,
    placement = 'top',
    arrow = false,
    popperOptions = DEFAULT_POPPER_OPTIONS,
    // из-за особенностей типизации Popover и Tooltip (type PopoverProps = PopoverPropsWithTargetId | PopoverPropsWithVirtualTarget)
    // targetId прилетает внутри rest пропсов и ts не ругается внутри тех компонентов.
    // тут нужно убрать этот проп, чтобы он не спредился в атрибуты html элемента
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    targetId,
    ...rest
  } = props
  const [popperElement, setPopperElement] = useState<PopperElementType>(null)
  const [arrowElement, setArrowElement] = useState<PopperElementType>(null)

  const appliedPopperOptions = useMemo<PopperOptions>(() => {
    const { modifiers = [], ...rest } = popperOptions
    const extendedModifiers: PopperOptions['modifiers'] = [
      {
        name: 'arrow',
        enabled: arrow && Boolean(arrowElement),
        options: {
          element: arrowElement,
        },
      },
      { name: 'eventListeners', enabled: isRendered },
      ...modifiers,
    ]

    return {
      placement,
      modifiers: extendedModifiers,
      ...rest,
    }
  }, [isRendered, arrowElement, popperOptions, placement, arrow])

  const { styles: popperStyles, attributes, update } = usePopper(referenceElement, popperElement, appliedPopperOptions)

  const refInner = useCallback(
    (node: HTMLDivElement): void => {
      setPopperElement(node)

      if (!ref || !node || !update) return

      const wrapperRef: PopperWrapperRef = node
      wrapperRef.update = update

      if (typeof ref === 'function') {
        ref(wrapperRef)
      } else if ('current' in ref) {
        ref.current = wrapperRef
      }
    },

    [ref, update],
  )

  if (!isRendered) return null

  return (
    <div
      ref={refInner}
      style={popperStyles.popper}
      className={cx({ [styles.hidden]: !isShow }, popoverClassName)}
      {...attributes.popper}
      {...rest}
    >
      {children}

      {arrow && (
        <div ref={setArrowElement} style={popperStyles.arrow} data-popper-arrow={true} className={arrowClassName} />
      )}
    </div>
  )
})

PopperWrapper.displayName = 'PopperWrapper'
