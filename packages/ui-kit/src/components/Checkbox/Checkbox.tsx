import cx from 'classnames'
import React, { ChangeEvent, useCallback } from 'react'

import { ReactComponent as SvgIconCheck } from '../../assets/svg/ic_Check.svg'
import { ReactComponent as SvgIconIndetermined } from '../../assets/svg/ic_indetermined.svg'
import styles from './Checkbox.module.scss'
import { CheckboxProps } from './types'

export const Checkbox = ({
  checked,
  indetermined,
  disabled,
  className,
  onChange,
  label,
  testPrefix = '',
  ...rest
}: CheckboxProps): JSX.Element => {
  const onChangeCb = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { checked } = event.currentTarget

      onChange && onChange(checked, event)
    },
    [onChange],
  )

  return (
    <label
      className={cx(
        styles.label,
        {
          [styles.label__checked]: checked || indetermined,
          [styles.label__disabled]: disabled,
        },
        className,
      )}
    >
      <div
        className={cx(styles.checkbox, {
          [styles.checkbox__checked]: checked || indetermined,
          [styles.checkbox__disabled]: disabled,
        })}
      >
        {indetermined ? <SvgIconIndetermined /> : checked && <SvgIconCheck />}
      </div>
      <div className={cx(styles.text, { [styles.text__disabled]: disabled })}>{label}</div>
      <input
        checked={checked}
        disabled={disabled}
        type="checkbox"
        onChange={onChangeCb}
        data-test-id={`${testPrefix}checkbox`}
        className={styles.hiddenCheckbox}
        {...rest}
      />
    </label>
  )
}
