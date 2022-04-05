/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import cx from 'classnames'
import React, { MouseEvent, PropsWithChildren } from 'react'

import { Checkbox } from '../../../Checkbox'
import { useSelectContext } from '../../context'
import { MultiselectItemProps, SelectBaseOption } from '../../types'
import styles from './MultiselectItem.module.scss'

type IsSelectContexMulty = true

export const MultiselectItem = <T extends SelectBaseOption = SelectBaseOption>({
  option,
  isSelected,
  children,
}: PropsWithChildren<MultiselectItemProps<T>>): JSX.Element => {
  const { commonProps, itemProps } = useSelectContext<IsSelectContexMulty>()
  const { selectedValue, onChange, testPrefix, popupRef, targetRef, updateSearchValue } = commonProps
  const { className = '', ...restItemProps } = itemProps

  const handleClick = (): void => {
    if (!isSelected) {
      onChange([...selectedValue, option])
    } else {
      onChange(selectedValue.filter((op) => op.value !== option.value))
    }

    updateSearchValue('')
    targetRef.current?.focus()

    if (!popupRef.current?.update) return

    void popupRef.current.update()
  }

  const handleCheckboxClick = (e: MouseEvent<HTMLInputElement>): void => {
    e.stopPropagation()
  }

  return (
    <div
      className={cx(styles.container, className)}
      onClick={handleClick}
      data-test-id={`${testPrefix}option-${option.value}`}
      {...restItemProps}
    >
      {children || (
        <div className={styles.item}>
          <Checkbox checked={Boolean(isSelected)} onClick={handleCheckboxClick} />
          {option.label}
        </div>
      )}
    </div>
  )
}
