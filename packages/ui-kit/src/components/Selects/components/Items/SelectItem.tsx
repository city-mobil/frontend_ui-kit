/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import cx from 'classnames'
import React, { PropsWithChildren } from 'react'

import { useSelectContext } from '../../context'
import { SelectBaseOption, SelectItemProps } from '../../types'
import styles from './SelectItem.module.scss'

type IsSelectContexMulty = false

export const SelectItem = <T extends SelectBaseOption = SelectBaseOption>({
  option,
  children,
}: PropsWithChildren<SelectItemProps<T>>): JSX.Element => {
  const { commonProps, itemProps } = useSelectContext<IsSelectContexMulty>()
  const { selectedValue, onChange, testPrefix } = commonProps
  const { className = '', ...restItemProps } = itemProps

  const handleClick = (): void => {
    onChange(option)
  }

  return (
    <div
      className={cx(
        styles.selectItem,
        { [styles.selectItem__selected]: selectedValue?.value === option.value },
        className,
      )}
      onClick={handleClick}
      data-test-id={`${testPrefix}option-${option.value}`}
      {...restItemProps}
    >
      {children || option.label}
    </div>
  )
}
