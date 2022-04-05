import cx from 'classnames'
import React, { ChangeEvent, TextareaHTMLAttributes, useCallback, useEffect, useRef } from 'react'

import { noop } from '../../helpers'
import { useCombinedRefs } from '../../hooks'
import styles from './Textarea.module.scss'

type BaseTextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement>
type OverwrittenProps = 'value' | 'onChange'
type ProxiedTextAreaAttributes = Omit<BaseTextAreaProps, OverwrittenProps>

export interface TextareaProps extends ProxiedTextAreaAttributes {
  value: string
  className?: string
  onChange?: (val: string, event: ChangeEvent) => void
  flat?: boolean
  autoresize?: boolean
  minHeight?: number
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, value, onChange = noop, flat = false, autoresize = false, minHeight = 0, ...restProps }, ref) => {
    const innerRef = useRef<HTMLTextAreaElement>(null)
    const combinedRef = useCombinedRefs<HTMLTextAreaElement>(ref, innerRef)

    useEffect(() => {
      const el = innerRef?.current

      if (!el) return

      if (autoresize) {
        el.style.height = 'auto'

        const newHeghit = Math.max(minHeight, el.scrollHeight)

        el.style.height = `${newHeghit}px`
      } else {
        el.style.height = `${minHeight}px`
      }
    }, [value, innerRef, autoresize, minHeight])

    const onChangeValue = useCallback(
      (event: ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = event.currentTarget.value
        onChange(newValue, event)
      },
      [onChange],
    )

    return (
      <textarea
        ref={combinedRef}
        className={cx(styles.textarea, { [styles.textarea_flat]: flat }, className)}
        value={value}
        onChange={onChangeValue}
        {...restProps}
      />
    )
  },
)

Textarea.displayName = 'Textarea'
