import cx from 'classnames'
import React, { MutableRefObject, useCallback, useMemo } from 'react'

import { ReactComponent as ArrowBottomIcon } from '../../../../assets/svg/ic-arrow-bottom.svg'
import { useTemporarilyShowTooltip } from '../../../../hooks'
import {
  calcSuffixWidth,
  containerPaddingBySize,
  InputPlaceholderProps,
  InputSuffixIconsProps,
} from '../../../../internal/components'
import { DEFAULT_PLACEHOLDER } from '../../constants'
import { useSelectContext } from '../../context'
import { DataAttributes } from '../../types'
import styles from './TargetShared.module.scss'

type IsSelectContextMulti = false

interface GetInputMirrorLabel {
  isOpen: boolean
  openLabel?: string
  selectedLabel?: string
  notOpenLabel?: string
}
const getInputMirrorLabel = ({
  isOpen,
  openLabel = '',
  selectedLabel = '',
  notOpenLabel = '',
}: GetInputMirrorLabel): string => {
  if (!isOpen) return notOpenLabel

  if (selectedLabel) return selectedLabel

  return openLabel
}

interface InputProps {
  className: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  value: string
  disabled: boolean
  ['data-test-id']: string
}

type TargetWrapperProps = React.HTMLAttributes<HTMLElement> & DataAttributes

interface ClassNameProp {
  className: string
}

interface UseTargetContainerOptions {
  containerClassName?: string
  inputRef: MutableRefObject<HTMLInputElement | null>
}

interface UseTargetContainerResult {
  targetWrapperProps: TargetWrapperProps
  targetContentProps: ClassNameProp
  inputSuffixIconsProps: InputSuffixIconsProps
  inputProps: InputProps
  inputMirrorProps: ClassNameProp
  inputMirrorLabel: string
  inputPlaceholderProps: InputPlaceholderProps
  inputPlaceholder: string
  showInput: boolean
  showInputPlaceholder: boolean
}

export const useTargetContainer = ({
  containerClassName = '',
  inputRef,
}: UseTargetContainerOptions): UseTargetContainerResult => {
  const { targetProps, commonProps } = useSelectContext<IsSelectContextMulti>()
  const {
    placeholder = DEFAULT_PLACEHOLDER,
    errorTooltipText = '',
    errorTooltipAutoShow = true,
    targetId,
    errorBorder = false,
    className,
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
    onChange,
    testPrefix,
  } = commonProps

  const { iconRef, tooltipRef, temporarilyShowTooltip, handleMouseEnterIcon } = useTemporarilyShowTooltip(
    errorTooltipAutoShow,
    errorTooltipText,
  )

  const placeholderPosition: InputPlaceholderProps['position'] = isOpen || selectedValue ? 'top' : 'middle'

  const handleContainerFocus = useCallback((): void => {
    if (!isOpen) return

    inputRef.current?.focus()

    if (errorTooltipAutoShow) {
      temporarilyShowTooltip()
    } else {
      tooltipRef.current?.show()
    }
  }, [isOpen, errorTooltipAutoShow, inputRef, temporarilyShowTooltip, tooltipRef])

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      updateSearchValue(e.currentTarget.value)
    },
    [updateSearchValue],
  )

  const handleClear = useCallback((): void => {
    onChange(null)
  }, [onChange])

  const containerSizeClassName = styles[`container__${size}`]
  const showClear = clearable && isOpen && !!selectedValue
  const showErrorIcon = Boolean(errorTooltipText) && (!isOpen || !showClear)

  const numSuffixIcons = Number(showClear) + Number(showErrorIcon) + 1 // +1 тк ArrowBottom всегда показывем

  const suffixWidth = calcSuffixWidth(numSuffixIcons, size)
  const openInputMirrorValue = !selectedValue || searchValue ? searchValue || placeholder : ''
  const notOpenInputMirrorValue = size === 'lg' ? selectedValue?.label : selectedValue?.label ?? placeholder

  const containerStyles = useMemo(
    () => ({
      paddingRight: suffixWidth !== 0 ? suffixWidth : containerPaddingBySize[size],
    }),
    [size, suffixWidth],
  )

  const targetWrapperClassName = cx(styles.container, containerSizeClassName, containerClassName, {
    [styles.container__focused]: isOpen,
    [styles.container__isDisabled]: disabled,
    [styles.container__erroredBorder]: errorBorder || !!errorTooltipText,
  })
  const targetWrapperProps = useMemo(
    () => ({
      className: targetWrapperClassName,
      style: containerStyles,
      id: targetId,
      onFocus: handleContainerFocus,
      tabIndex: 0,
      ['data-test-id']: `${testPrefix}target`,
      ...restTargetProps,
    }),
    [targetWrapperClassName, containerStyles, targetId, handleContainerFocus, testPrefix, restTargetProps],
  )

  const inputSuffixIconsProps = useMemo(
    () => ({
      size,
      showErrorIcon,
      showClear,
      errorTooltipText,
      suffixIconContainerClassName: cx(styles.arrow, { [styles.arrow__isOpen]: isOpen }),
      iconRef,
      tooltipRef,
      SuffixIcon: ArrowBottomIcon,
      handleMouseEnterIcon,
      handleClear,
    }),
    [size, showErrorIcon, showClear, errorTooltipText, isOpen, handleMouseEnterIcon, handleClear, iconRef, tooltipRef],
  )

  const inputProps = useMemo(
    () => ({
      className: styles.input,
      onChange: handleInputChange,
      value: searchValue,
      disabled: disabled,
      ['data-test-id']: `${testPrefix}input`,
    }),
    [disabled, testPrefix, handleInputChange, searchValue],
  )

  const inputMirrorProps = useMemo(
    () => ({
      className: cx(styles.inputMirror, {
        [styles.inputMirror__focused]: isOpen,
        [styles.inputMirror__placeholder]: !isOpen && !selectedValue,
        [styles.inputMirror__hidden]: isOpen && (searchValue || (size === 'lg' && !selectedValue)),
      }),
    }),
    [isOpen, selectedValue, searchValue, size],
  )

  const inputMirrorLabel = getInputMirrorLabel({
    isOpen,
    openLabel: openInputMirrorValue,
    selectedLabel: selectedValue?.label,
    notOpenLabel: notOpenInputMirrorValue,
  })

  const inputPlaceholderProps = useMemo(
    () => ({
      position: placeholderPosition,
      isParentFocused: isOpen,
      prefixWidth: 0,
    }),
    [placeholderPosition, isOpen],
  )

  const targetContentProps = useMemo(
    () => ({
      className: cx(styles.content, { [styles.content__lg]: size === 'lg' }),
    }),
    [size],
  )

  const showInputPlaceholder = size === 'lg'
  const inputPlaceholder = placeholder
  const showInput = searchable

  return useMemo(
    () => ({
      // мемоизированные объекты
      targetWrapperProps,
      inputSuffixIconsProps,
      inputProps,
      inputMirrorProps,
      inputPlaceholderProps,
      targetContentProps,

      // примитивы
      inputPlaceholder,
      showInputPlaceholder,
      inputMirrorLabel,
      showInput,
    }),
    [
      targetWrapperProps,
      inputSuffixIconsProps,
      inputProps,
      inputMirrorProps,
      inputPlaceholderProps,
      targetContentProps,

      inputPlaceholder,
      showInputPlaceholder,
      inputMirrorLabel,
      showInput,
    ],
  )
}
