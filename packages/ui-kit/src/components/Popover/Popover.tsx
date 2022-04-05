import { noop, Overlay, OverlayRef, PopperOptions, ReferenceElementType } from '@city/ui-kit-core'
import { VirtualElement } from '@popperjs/core'
import cx from 'classnames'
import React, { forwardRef, memo, useEffect, useMemo, useState } from 'react'

import { DEFAULT_POPOVER_OFFSET, DEFAULT_POPPER_OPTIONS } from './constants'
import styles from './Popover.module.scss'
import { PopoverProps, PopoverPropsWithTargetId, PopoverPropsWithVirtualTarget } from './types'

export const Popover = memo(
  forwardRef<OverlayRef, PopoverProps>((props, ref) => {
    const {
      children,
      placement = 'top',
      arrow = true,
      showOnLoad = false,
      trigger = 'click',
      className = '',
      popperOptions = DEFAULT_POPPER_OPTIONS,
      rootId,
      closeOnOutsideClick = true,
      withPortal = true,
      onOpen = noop,
      onClose = noop,
      ...rest
    } = props
    const { targetId } = props as PopoverPropsWithTargetId
    const { virtualTarget } = props as PopoverPropsWithVirtualTarget

    const [referenceElement, setReferenceElement] = useState<ReferenceElementType | VirtualElement>(null)
    const appliedPopperOptions = useMemo<PopperOptions>(() => {
      const { modifiers = [], ...rest } = popperOptions

      return {
        placement,
        modifiers: [DEFAULT_POPOVER_OFFSET, ...modifiers],
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
        popoverClassName={cx(styles.popover, className)}
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
        {...rest}
      >
        {children}
      </Overlay>
    )
  }),
)

Popover.displayName = 'Popover'
