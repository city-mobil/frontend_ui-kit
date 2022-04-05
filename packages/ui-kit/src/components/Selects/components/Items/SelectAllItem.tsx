/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import cx from 'classnames'
import React, { MouseEvent } from 'react'

import { Divider } from '../../../../internal/components'
import { Checkbox } from '../../../Checkbox'
import { useSelectContext } from '../../context'
import { SelectAllItemProps } from '../../types'
import multiselectItemstyles from './MultiselectItem.module.scss'
import styles from './SelectAllItem.module.scss'

type IsSelectContexMulty = true

export const SelectAllItem = ({ label = 'Выбрать все' }: SelectAllItemProps): JSX.Element => {
  const { commonProps, itemProps } = useSelectContext<IsSelectContexMulty>()
  const { options, selectedValue, onChange } = commonProps
  const { className = '', ...restItemProps } = itemProps

  const isSelected = options.length === selectedValue.length

  const handleClick = (): void => {
    if (isSelected) {
      onChange([])
    } else {
      onChange(options)
    }
  }

  const handleCheckboxClick = (e: MouseEvent<HTMLInputElement>): void => {
    e.stopPropagation()
  }

  return (
    <>
      <div
        className={cx(multiselectItemstyles.container, styles.container, className)}
        onClick={handleClick}
        {...restItemProps}
      >
        <div className={multiselectItemstyles.item}>
          <Checkbox checked={Boolean(isSelected)} onClick={handleCheckboxClick} />
          {label || 'Выбрать все'}
        </div>
      </div>
      <Divider className={styles.divider} />
    </>
  )
}
