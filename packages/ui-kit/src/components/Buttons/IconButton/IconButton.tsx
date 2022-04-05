import cx from 'classnames'
import React, { forwardRef } from 'react'

import { Button } from '../Button'
import styles from './IconButton.module.scss'
import { IconButtonProps } from './types'

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon: Icon, title, className, size = 'xs', testPrefix = '', disabled = false, ...props }, ref) => {
    return (
      <Button
        className={cx(styles.button, className)}
        variant="flat"
        size={size}
        disabled={disabled}
        ref={ref}
        data-test-id={`${testPrefix}-icon-button`}
        {...props}
      >
        <div
          className={cx(styles.iconContainer, styles[`iconContainer__${size}`], {
            [styles.iconContainer__marginRight]: !!title,
          })}
        >
          <Icon className={styles.icon} />
        </div>
        {title && title}
      </Button>
    )
  },
)
IconButton.displayName = 'IconButton'
