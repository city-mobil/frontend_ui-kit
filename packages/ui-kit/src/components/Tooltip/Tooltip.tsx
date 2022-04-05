import { noop, Overlay, OverlayRef, PopperOptions, ReferenceElementType } from '@city/ui-kit-core'
import { VirtualElement } from '@popperjs/core'
import cx from 'classnames'
import React, { forwardRef, memo, useEffect, useMemo, useState } from 'react'

import { DEFAULT_POPPER_OPTIONS, DEFAULT_TOOLTIP_OFFSET } from './constants'
import styles from './Tooltip.module.scss'
import { TooltipProps, TooltipPropsWithTargetId, TooltipPropsWithVirtualTarget } from './types'

export const Tooltip = memo(
  forwardRef<OverlayRef, TooltipProps>((props, ref) => {
    const {
      children,
      type = 'regular',
      placement = 'top',
      arrow = true,
      showOnLoad = false,
      trigger = 'hover',
      className = '',
      popperOptions = DEFAULT_POPPER_OPTIONS,
      rootId,
      closeOnOutsideClick = true,
      withPortal = true,
      onOpen = noop,
      onClose = noop,
    } = props
    const { targetId } = props as TooltipPropsWithTargetId
    const { virtualTarget } = props as TooltipPropsWithVirtualTarget

    const [referenceElement, setReferenceElement] = useState<ReferenceElementType | VirtualElement>(null)
    const appliedPopperOptions = useMemo<PopperOptions>(() => {
      const { modifiers = [], ...rest } = popperOptions

      return {
        placement,
        modifiers: [DEFAULT_TOOLTIP_OFFSET, ...modifiers],
        ...rest,
      }
    }, [popperOptions, placement])

    useEffect(() => {
      if (typeof targetId === 'string') {
        const target = document.getElementById(targetId)

        if (!target) return

        setReferenceElement(target)
      } else {
        setReferenceElement(virtualTarget)
      }
    }, [targetId, virtualTarget])

    return (
      <Overlay
        placement={placement}
        arrow={arrow}
        popoverClassName={cx(
          styles.tooltip,
          {
            [styles.regular]: type === 'regular',
            [styles.error]: type === 'error',
          },
          className,
        )}
        arrowClassName={styles.arrow}
        popperOptions={appliedPopperOptions}
        ref={ref}
        referenceElement={referenceElement}
        showOnLoad={showOnLoad}
        trigger={trigger}
        rootId={rootId}
        closeOnOutsideClick={closeOnOutsideClick}
        withPortal={withPortal}
        onOpen={onOpen}
        onClose={onClose}
      >
        {children}
      </Overlay>
    )
  }),
)

Tooltip.displayName = 'Tooltip'
