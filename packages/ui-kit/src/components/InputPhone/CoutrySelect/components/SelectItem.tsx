import cx from 'classnames'
import React, { PropsWithChildren } from 'react'

import { SelectBaseOption, SelectItemProps, useSelectContext } from '../../../Selects'
import styles from './SelectItem.module.scss'

type IsSelectContextMulti = false

export const SelectItem = <T extends SelectBaseOption = SelectBaseOption>({
  option,
  children,
}: PropsWithChildren<SelectItemProps<T>>): JSX.Element => {
  const { commonProps } = useSelectContext<IsSelectContextMulti>()
  const { selectedValue, onChange, testPrefix } = commonProps

  const handleClick = (): void => {
    onChange(option)
  }

  const { label, country, Flag } = option

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div
      className={cx(styles.selectItem, {
        [styles.selectItem__selected]: selectedValue?.value === option.value,
      })}
      onClick={handleClick}
      data-test-id={`${testPrefix}option-${option.value}`}
    >
      <Flag />
      {children || label}
      <div>{country}</div>
    </div>
  )
}

SelectItem.displayName = 'SelectItem'
