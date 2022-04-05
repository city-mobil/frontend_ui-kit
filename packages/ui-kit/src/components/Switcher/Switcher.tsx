import cx from 'classnames'
import React, { useCallback, useEffect, useState } from 'react'

import { noop } from '../../helpers'
import { Size } from '../../types'
import styles from './Switcher.module.scss'

export interface SwitcherProps {
  checked?: boolean
  size?: Exclude<Size, 'xs'>
  disabled?: boolean
  onChange?: (checked: boolean) => void
}

export const Switcher = ({ checked, size = 'sm', disabled = false, onChange = noop }: SwitcherProps): JSX.Element => {
  const controlled = checked !== undefined
  const [stateChecked, setStateChecked] = useState(controlled && checked)

  useEffect(() => {
    if (controlled) {
      setStateChecked(checked)
    }
  }, [checked, controlled])

  const onChangeCb = useCallback(() => {
    if (disabled) {
      return
    }

    onChange(!stateChecked)

    if (!controlled) {
      setStateChecked(!stateChecked)
    }
  }, [stateChecked, onChange, disabled, controlled])

  const containerSizeClassName = styles[`switcher__${size}`]
  const dotSizeClassName = styles[`dot__${size}`]

  return (
    <label
      className={cx(styles.switcher, containerSizeClassName, {
        [styles.switcher__checked]: stateChecked,
        [styles.switcher__disabled]: disabled,
      })}
    >
      <div className={cx(styles.dot_container, { [styles.dot_container__checked]: stateChecked })}>
        <div
          className={cx(styles.dot, dotSizeClassName, {
            [styles.dot__disabled]: disabled,
          })}
        />
      </div>
      <input
        type="checkbox"
        onChange={onChangeCb}
        checked={stateChecked}
        disabled={disabled}
        className={styles.hiddenInput}
      />
    </label>
  )
}
