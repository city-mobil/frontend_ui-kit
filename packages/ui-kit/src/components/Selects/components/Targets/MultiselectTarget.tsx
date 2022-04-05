import cx from 'classnames'
import React, { forwardRef, useLayoutEffect, useMemo, useRef, useState } from 'react'

import { ReactComponent as ArrowBottomIcon } from '../../../../assets/svg/ic-arrow-bottom.svg'
import { useCombinedRefs, useTemporarilyShowTooltip } from '../../../../hooks'
import {
  calcSuffixWidth,
  containerPaddingBySize,
  InputPlaceholder,
  InputSuffixIcons,
} from '../../../../internal/components'
import { DEFAULT_INPUT_WIDTH, DEFAULT_PLACEHOLDER } from '../../constants'
import { useSelectContext } from '../../context'
import { MultiselectTargetProps } from '../../types'
import styles from './MultiselectTarget.module.scss'
import styledTargetShared from './TargetShared.module.scss'

type IsSelectContexMulty = true

export const MultiselectTarget = forwardRef<HTMLInputElement, MultiselectTargetProps>(({ Tag }, ref) => {
  const { targetProps, commonProps } = useSelectContext<IsSelectContexMulty>()
  const {
    placeholder = DEFAULT_PLACEHOLDER,
    errorTooltipText = '',
    errorTooltipAutoShow = true,
    targetId,
    errorBorder = false,
    className = '',
    ...restTargetProps
  } = targetProps
  const {
    size,
    isOpen,
    searchValue,
    selectedValue,
    disabled,
    searchable,
    updateSearchValue,
    clearable,
    testPrefix,
    popupRef,
    onSubmit,
  } = commonProps
  const [inputMirrorLength, setInputMirrorLength] = useState(DEFAULT_INPUT_WIDTH)
  const inputMirrorRef = useRef<HTMLSpanElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const combinedInputRef = useCombinedRefs(ref, inputRef)
  const { iconRef, tooltipRef, temporarilyShowTooltip, handleMouseEnterIcon } = useTemporarilyShowTooltip(
    errorTooltipAutoShow,
    errorTooltipText,
  )

  useLayoutEffect(() => {
    if (!inputMirrorRef.current) return

    setInputMirrorLength(inputMirrorRef.current.getBoundingClientRect().width + DEFAULT_INPUT_WIDTH)
  }, [searchValue])

  useLayoutEffect(() => {
    if (isOpen) return

    setInputMirrorLength(DEFAULT_INPUT_WIDTH)
  }, [isOpen])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    updateSearchValue(e.currentTarget.value)

    if (!popupRef.current?.update || size !== 'lg') return

    void popupRef.current.update()
  }

  const handleContainerFocus = (): void => {
    if (!isOpen) return

    inputRef.current?.focus()

    if (errorTooltipAutoShow) {
      temporarilyShowTooltip()
    } else {
      tooltipRef.current?.show()
    }
  }

  const handleClear = (): void => {
    onSubmit([])
  }

  const containerSizeClassName = styledTargetShared[`container__${size}`]
  const placeholderPosition = isOpen || selectedValue.length > 0 ? 'top' : 'middle'

  const showClear = clearable && isOpen && !!selectedValue
  const showErrorIcon = Boolean(errorTooltipText) && (!isOpen || !showClear)
  const numSuffixIcons = Number(showClear) + Number(showErrorIcon) + 1 // +1 тк ArrowBottom всегда показывем
  const suffixWidth = calcSuffixWidth(numSuffixIcons, size)
  const containerStyles = useMemo(
    () => ({
      paddingRight: suffixWidth !== 0 ? suffixWidth : containerPaddingBySize[size],
    }),
    [size, suffixWidth],
  )

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className={cx(styledTargetShared.container, containerSizeClassName, className, {
        [styledTargetShared.container__focused]: isOpen,
        [styledTargetShared.container__isDisabled]: disabled,
        [styledTargetShared.container__erroredBorder]: errorBorder || !!errorTooltipText,
        [styles.containerMultiselectLg]: size === 'lg',
      })}
      style={containerStyles}
      id={targetId}
      onFocus={handleContainerFocus}
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={0}
      data-test-id={`${testPrefix}target`}
      {...restTargetProps}
    >
      <div
        className={cx(
          styledTargetShared.content,
          styledTargetShared.inputMirror__placeholder,
          styles.contentMultiselect,
          {
            [styledTargetShared.content__lg]: size === 'lg',
            [styles.contentMultiselectLg]: size === 'lg',
          },
        )}
      >
        {selectedValue.length > 0 && size === 'lg' && selectedValue.map((op) => <Tag option={op} key={op.value} />)}
        {selectedValue.length > 0 && size !== 'lg' && <Tag />}
        {selectedValue.length === 0 && size !== 'lg' && !searchValue && placeholder}

        {searchable && (
          <input
            style={{ width: inputMirrorLength }}
            className={cx(styledTargetShared.input, styles.inputMultiselect)}
            onChange={handleInputChange}
            ref={combinedInputRef}
            value={searchValue}
            disabled={disabled}
            data-test-id={`${testPrefix}input`}
          />
        )}

        <span
          ref={inputMirrorRef}
          className={cx(styledTargetShared.inputMirror, {
            [styledTargetShared.inputMirror__hidden]: true,
          })}
        >
          {searchValue}
        </span>
      </div>

      {size === 'lg' && (
        <InputPlaceholder position={placeholderPosition} isParentFocused={isOpen} prefixWidth={0}>
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
        suffixIconContainerClassName={cx(styledTargetShared.arrow, { [styledTargetShared.arrow__isOpen]: isOpen })}
        SuffixIcon={ArrowBottomIcon}
        handleMouseEnterIcon={handleMouseEnterIcon}
        handleClear={handleClear}
      />
    </div>
  )
})

MultiselectTarget.displayName = 'MultiselectTarget'
