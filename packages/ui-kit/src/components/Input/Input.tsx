import cx from 'classnames'
import React, { ChangeEvent, FocusEvent, forwardRef, useMemo, useRef, useState } from 'react'

import { useCombinedRefs, useTemporarilyShowTooltip } from '../../hooks'
import { calcSuffixWidth, containerPaddingBySize, InputSuffixIcons } from '../../internal/components'
import { InputPlaceholder } from '../../internal/components/InputPlaceholder'
import iconsContainerStyles from '../../internal/styles/InputIcons.module.scss'
import styles from './Input.module.scss'
import { InputProps } from './types'
import { calcPrefixWidth } from './utils'

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    value,
    onBlur,
    onFocus,
    placeholder = '',
    disabled = false,
    className,
    size = 'sm',
    isClearable = false,
    suffixIcon: SuffixIcon,
    prefixIcon: PrefixIcon,
    errorTooltipText,
    erroredBorder = false,
    suffixIconContainerClassName,
    prefixIconContainerClassName,
    autoShowErrorTooltip = true,
    flat = false,
    onChange,
    onSuffixIconClick,
    testPrefix = '',
    rootId,
    ...rest
  } = props

  const [isFocused, setIsFocused] = useState(false)
  const innerRef = useRef<HTMLInputElement>(null)
  const combinedRef = useCombinedRefs(ref, innerRef)
  const inputPlaceholder = size === 'lg' ? '' : placeholder
  const placeholderPosition = isFocused || value ? 'top' : 'middle'
  const showClear = isClearable && isFocused && !!value
  const showErrorIcon = Boolean(errorTooltipText) && (!isFocused || !showClear)

  const { iconRef, tooltipRef, temporarilyShowTooltip, handleMouseEnterIcon } = useTemporarilyShowTooltip(
    autoShowErrorTooltip,
    errorTooltipText,
  )

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (!onChange) return

    const { value } = e.currentTarget

    onChange(value, e)
  }

  const handleFocus = (e: FocusEvent<HTMLInputElement>): void => {
    setIsFocused(true)
    if (autoShowErrorTooltip) {
      temporarilyShowTooltip()
    } else {
      tooltipRef.current?.show()
    }

    if (!onFocus) return

    onFocus(e)
  }

  const handleBlur = (e: FocusEvent<HTMLInputElement>): void => {
    setIsFocused(false)

    if (errorTooltipText && autoShowErrorTooltip) {
      tooltipRef.current?.hide()
    }

    if (!onBlur) return

    onBlur(e)
  }

  const handleContainerClick = (): void => {
    // при mouseDown на иконку она забирает фокус, поэтому его надо возвращать в setTimeout
    setTimeout(() => {
      if (innerRef.current) {
        innerRef.current.focus()
      }
    }, 0)
  }

  const handleClear = (): void => {
    if (!onChange) return

    onChange('')
  }

  const numSuffixIcons = Number(showClear) + Number(showErrorIcon) + Number(Boolean(SuffixIcon))
  const suffixWidth = calcSuffixWidth(numSuffixIcons, size)
  const prefixWidth = calcPrefixWidth(Boolean(PrefixIcon), size)
  const inputStyles = useMemo(
    () => ({
      paddingRight: suffixWidth !== 0 ? suffixWidth : containerPaddingBySize[size],
      paddingLeft: prefixWidth !== 0 ? prefixWidth : containerPaddingBySize[size],
    }),
    [prefixWidth, size, suffixWidth],
  )
  const containerSizeClassName = styles[`container__${size}`]
  const iconsContainerLeftClassName = iconsContainerStyles[`iconsContainer__left__${size}`]

  return (
    <div
      className={cx(
        styles.container,
        containerSizeClassName,
        {
          [styles.container__flat]: flat,
          [styles.container__isDisabled]: disabled,
          [styles.container__focused]: isFocused,
          [styles.container__erroredBorder]: erroredBorder || !!errorTooltipText,
        },
        className,
      )}
      onMouseDown={handleContainerClick}
      role="presentation"
    >
      {PrefixIcon && (
        <div className={cx(iconsContainerStyles.iconsContainer, iconsContainerLeftClassName)}>
          <div className={cx(iconsContainerStyles.iconContainer, prefixIconContainerClassName)}>
            <PrefixIcon />
          </div>
        </div>
      )}
      <input
        ref={combinedRef}
        value={value}
        className={cx(styles.input, { [styles.input__lg]: size === 'lg' })}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        placeholder={inputPlaceholder}
        style={inputStyles}
        disabled={disabled}
        data-test-id={`${testPrefix}input`}
        {...rest}
      />
      {size === 'lg' && (
        <InputPlaceholder position={placeholderPosition} isParentFocused={isFocused} prefixWidth={prefixWidth}>
          {placeholder}
        </InputPlaceholder>
      )}

      <InputSuffixIcons
        size={size}
        showErrorIcon={showErrorIcon}
        showClear={showClear}
        iconRef={iconRef}
        tooltipRef={tooltipRef}
        errorTooltipText={errorTooltipText}
        suffixIconContainerClassName={suffixIconContainerClassName}
        SuffixIcon={SuffixIcon}
        handleMouseEnterIcon={handleMouseEnterIcon}
        handleClear={handleClear}
        onSuffixIconClick={onSuffixIconClick}
        rootId={rootId}
      />
    </div>
  )
})

Input.displayName = 'Input'
