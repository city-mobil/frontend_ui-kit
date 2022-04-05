import { Typography } from '@city/ui-kit-core'
import cx from 'classnames'
import React, { ReactText, useCallback, useContext, useMemo } from 'react'

import { noop } from '../../helpers'
import styles from './Radio.module.scss'
import { radioContext } from './RadioGroup'

export interface RadioProps {
  /**
   * Ignored if `<Radio>` in a `<Radio.Group>`
   */
  checked?: boolean
  /**
   * The name property of `input[type="radio"]`.
   * Ignored if `<Radio>` in a `<Radio.Group>`
   */
  name?: string
  description?: string
  disabled?: boolean
  value: ReactText
  className?: string
  onChange?: (value: ReactText) => void
}

export const Radio: React.FC<RadioProps> = ({
  name,
  value,
  children,
  checked = false,
  disabled = false,
  description = '',
  className = '',
  onChange = noop,
}) => {
  const childContent = useMemo(
    () =>
      typeof children === 'string' ? (
        <div className={styles.overflowHiddenContainer}>
          <Typography.P13 className={styles.p13Styled}>{children}</Typography.P13>
        </div>
      ) : (
        <div className={styles.customChildContainer}>{children}</div>
      ),
    [children],
  )

  const { contextHandleChange = noop, contextValue, contextDisabled, contextName } = useContext(radioContext) || {}

  const handleChange = useCallback(() => {
    if (disabled || contextDisabled) {
      return
    }

    onChange(value)
    contextHandleChange(value)
  }, [contextDisabled, contextHandleChange, disabled, onChange, value])

  const resultChecked = contextValue !== undefined ? contextValue === value : checked
  const resultDisabled = disabled || contextDisabled

  return (
    <label
      className={cx(
        styles.label,
        { [styles.label__disabled]: resultDisabled, [styles.label__checked]: resultChecked },
        className,
      )}
    >
      <input
        value={value}
        type="radio"
        name={contextName || name}
        onChange={handleChange}
        checked={resultChecked}
        className={styles.hiddenInput}
      />
      <div
        className={cx(styles.radioIcon, {
          [styles.radioIcon__checked]: resultChecked,
          [styles.radioIcon__disabled]: resultDisabled,
        })}
      ></div>
      {childContent}
      {description && <Typography.P12 className={styles.description}>{description}</Typography.P12>}
    </label>
  )
}
