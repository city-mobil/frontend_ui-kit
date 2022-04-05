import cx from 'classnames'
import React, { forwardRef } from 'react'

import { ReactComponent as ArrowBottomIcon } from '../../../../assets/svg/ic-arrow-bottom-16.svg'
import { Button } from '../../../Buttons'
import { useSelectContext } from '../../context'
import styles from './FlatSelectTarget.module.scss'

type IsSelectContexMulty = false

export const FlatSelectTarget = forwardRef<HTMLButtonElement, Record<string, unknown>>((_, ref) => {
  const { targetProps, commonProps } = useSelectContext<IsSelectContexMulty>()
  const { targetId, placeholder, className } = targetProps
  const { selectedValue, size, isOpen } = commonProps

  return (
    <Button
      variant="flat"
      className={cx(styles.button, { [styles.button__open]: isOpen }, className)}
      id={targetId}
      size={size}
      ref={ref}
    >
      {selectedValue?.label || placeholder}
      <ArrowBottomIcon
        className={cx(styles.arrowBottom, {
          [styles.arrowBottom__open]: isOpen,
        })}
      />
    </Button>
  )
})

FlatSelectTarget.displayName = 'FlatSelectTarget'
