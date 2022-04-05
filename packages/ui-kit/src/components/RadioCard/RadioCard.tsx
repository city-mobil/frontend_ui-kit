import { Typography } from '@city/ui-kit-core'
import cn from 'classnames'
import React, { KeyboardEvent } from 'react'

import styles from './RadioCard.module.scss'
import { RadioCardProps } from './types'

export const RadioCard = ({
  className,
  icon: Icon,
  header,
  subHeader,
  description,
  selected,
  onClick,
  disabled,
}: RadioCardProps): JSX.Element => {
  const onEnterKeyDown = (e: KeyboardEvent): void => {
    if (e.key === 'Enter') {
      onClick()
    }
  }

  const tabIndex = disabled ? -1 : 0

  return (
    <div
      className={cn(styles.radioCard, { [styles.isSelected]: selected, [styles.isDisabled]: disabled }, className)}
      role="button"
      tabIndex={tabIndex}
      onClick={onClick}
      onKeyDown={onEnterKeyDown}
    >
      {Icon && <Icon className="mb-8" />}
      {header && <Typography.H3 className="mb-4">{header}</Typography.H3>}
      <Typography.P15 fontWeight="regular">{subHeader}</Typography.P15>
      {description && (
        <Typography.P13 className="mt-4" colorName="secondaryText">
          {description}
        </Typography.P13>
      )}
    </div>
  )
}
