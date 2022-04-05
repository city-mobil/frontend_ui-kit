import cx from 'classnames'
import React, { MouseEvent } from 'react'

import { ReactComponent as CloseIcon } from '../../../assets/svg/ic-close16.svg'
import { useSelectContext } from '../context'
import { SelectBaseOption, TagProps } from '../types'
import styles from './Tag.module.scss'

type IsSelectContexMulty = true

export const Tag = <T extends SelectBaseOption = SelectBaseOption>({ option }: TagProps<T>): JSX.Element => {
  const { commonProps, tagProps } = useSelectContext<IsSelectContexMulty>()
  const { onSubmit, onChange, selectedValue, size, isOpen } = commonProps
  const { className = '', ...restTagProps } = tagProps

  const handleCloseClick = (e: MouseEvent<SVGSVGElement>): void => {
    e.preventDefault()
    e.nativeEvent.stopImmediatePropagation()

    const newValue = selectedValue.filter((op) => op.value !== option?.value)

    if (isOpen) {
      onChange(newValue)
    } else {
      onSubmit(newValue)
    }
  }

  return (
    <div className={cx(styles.tag, { [styles.tagLg]: size === 'lg' }, className)} {...restTagProps}>
      {size === 'lg' ? option?.label : 'Выбрано'}
      {selectedValue.length > 0 && size !== 'lg' && <div className={styles.badge}>{selectedValue.length}</div>}
      {size === 'lg' && <CloseIcon className={styles.closeIcon} onMouseDown={handleCloseClick} />}
    </div>
  )
}
