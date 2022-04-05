import cx from 'classnames'
import React, { PropsWithChildren, useMemo } from 'react'

import styles from './InputPlaceholder.module.scss'

export interface InputPlaceholderProps {
  position: 'top' | 'middle'
  isParentFocused: boolean
  prefixWidth: number
}

export const InputPlaceholder = ({
  position,
  isParentFocused,
  prefixWidth,
  children,
}: PropsWithChildren<InputPlaceholderProps>): JSX.Element => {
  const containerStyles = useMemo(() => ({ left: prefixWidth || 16 }), [prefixWidth])

  return (
    <div
      className={cx(styles.container, {
        [styles.container__top]: position === 'top',
        [styles.container__parentFocused]: isParentFocused,
      })}
      style={containerStyles}
    >
      {children}
    </div>
  )
}
