import cx from 'classnames'
import React, { useCallback } from 'react'

import styles from './GroupButton.module.scss'
import { GroupButtonProps, GroupButtonSingleButtonProps } from './types'

const Button = ({
  option,
  size,
  selected,
  onChange,
  fullWidth,
  testPrefix,
}: GroupButtonSingleButtonProps): JSX.Element => {
  const { value, label } = option
  const onClick = useCallback(() => onChange(value), [onChange, value])

  return (
    <button
      onClick={onClick}
      className={cx(styles.button, styles[`button__${size}`], {
        [styles.button__selected]: selected,
        [styles.button__fullWidth]: fullWidth,
      })}
      type="button"
      data-test-id={testPrefix}
    >
      {label}
    </button>
  )
}

export const GroupButton = ({
  size,
  options,
  selectedOption,
  onChange,
  fullWidth = false,
  className,
  testPrefix = '',
}: GroupButtonProps): JSX.Element => (
  <div className={cx(styles.container, className)} data-test-id={`${testPrefix}group-button-container`}>
    {options.map((option) => (
      <Button
        key={option.value}
        size={size}
        option={option}
        selected={option.value === selectedOption}
        onChange={onChange}
        fullWidth={fullWidth}
        testPrefix={`${testPrefix}group-button-${option.value}`}
      />
    ))}
  </div>
)
