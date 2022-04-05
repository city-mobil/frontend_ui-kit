import cx from 'classnames'
import React, { ForwardedRef, forwardRef } from 'react'

import { Activity } from '../../Activity'
import styles from './Button.module.scss'
import { ButtonBaseProps, ButtonLinkProps, ButtonProps } from './types'

export const Button = forwardRef<HTMLElement, ButtonProps>((props, ref) => {
  const {
    children = '',
    variant = 'primary',
    disabled = false,
    size = 'md',
    testPrefix = '',
    fullWidth = false,
    className = '',
    loading = false,
    ...restProps
  } = props
  const { href, target = '_blank', type: anchorType, ...restAnchorProps } = restProps as ButtonLinkProps
  const { type = 'button', ...restButtonProps } = restProps as ButtonBaseProps
  const isDisabled = disabled || loading
  const isLink = !!href
  const resultClassName = cx(
    styles.button,
    {
      [styles.button__fullWidth]: fullWidth,
      [styles.button__linkDisabled]: isDisabled,
      [styles.button__link]: isLink,
    },
    className,
  )
  const content = (
    <div
      className={cx(styles.content, styles[`content__${variant}`], styles[`content__${size}`], {
        [styles.content__disabled]: isDisabled,
      })}
    >
      {loading && <Activity size={16} className={styles.loader} />}
      {loading ? <div className={styles.childrenLoading}>{children}</div> : children}
    </div>
  )

  return isLink ? (
    <a
      href={href}
      target={target}
      className={resultClassName}
      type={anchorType}
      ref={ref as ForwardedRef<HTMLAnchorElement>}
      data-test-id={`${testPrefix}button`}
      {...restAnchorProps}
    >
      {content}
    </a>
  ) : (
    <button
      className={resultClassName}
      disabled={disabled}
      type={type}
      ref={ref as ForwardedRef<HTMLButtonElement>}
      data-test-id={`${testPrefix}button`}
      {...restButtonProps}
    >
      {content}
    </button>
  )
})

Button.displayName = 'Button'
