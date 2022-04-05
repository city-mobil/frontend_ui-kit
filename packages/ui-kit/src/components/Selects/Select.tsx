import { noop, OVERLAY_ROOT_ID, OverlayRef, useUniqueId } from '@city/ui-kit-core'
import cx from 'classnames'
import React, { useCallback, useMemo, useRef, useState } from 'react'

import { useCombinedRefs } from '../../hooks'
import { SelectDefaults } from './components'
import { BASE_SELECT_POPPER_OPTIONS } from './constants'
import { SelectContext } from './context'
import { selectOptionsFilter } from './helpers'
import styles from './Select.module.scss'
import { SelectBaseOption, SelectContextValue, SelectProps } from './types'

export const Select = <T extends SelectBaseOption = SelectBaseOption, E extends HTMLElement = HTMLElement>(
  props: SelectProps<T, E>,
): JSX.Element => {
  const {
    value,
    options = [],
    onChange,
    components,
    children,
    onSearchStringChange = noop,
    clearable = false,
    loading = false,
    searchable = true,
    disabled = false,
    errorBorder = false,
    errorTooltipAutoShow = true,
    errorTooltipText = '',
    placeholder = '',
    size = 'sm',
    rootId = OVERLAY_ROOT_ID,
    targetRef = null,
    popupRef = null,
    testPrefix = '',
    className = '',
    popupProps = {},
    targetProps = {},
    itemProps = {},
    noOptionsProps = {},
    loadingProps = {},
    filter = selectOptionsFilter,
  } = props

  const [searchValue, setSearchValue] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const targetId = useUniqueId()
  const internalPopupRef = useRef<OverlayRef | null>(null)
  const combinedPopupRef = useCombinedRefs(popupRef, internalPopupRef)
  const internalTargetRef = useRef<E | null>(null)
  const combinedTargetRef = useCombinedRefs(targetRef, internalTargetRef)

  const handleChangeSearchValue = useCallback(
    (v: string): void => {
      setSearchValue(v)
      onSearchStringChange(v)
    },
    [onSearchStringChange],
  )

  const handleOpen = (): void => {
    setIsOpen(true)
  }

  const handleClose = (): void => {
    setIsOpen(false)
    setSearchValue('')
  }

  const handleChange = useCallback(
    (option: SelectBaseOption | null): void => {
      onChange(option as T)

      internalPopupRef.current?.hide()
    },
    [onChange],
  )

  const {
    Target = SelectDefaults.Target,
    Popup = SelectDefaults.Popup,
    NoOptions = SelectDefaults.NoOptions,
    SelectItem = SelectDefaults.Item,
    Loading = SelectDefaults.Loading,
  } = components || {}

  const { className: popupClassName = '', ...restPopupProps } = popupProps

  const contextValue: SelectContextValue = useMemo(
    () => ({
      targetProps: {
        targetId,
        errorBorder,
        errorTooltipText,
        errorTooltipAutoShow,
        placeholder,
        className,
        ...targetProps,
      },
      popupProps: {
        targetId,
        arrow: false,
        popperOptions: BASE_SELECT_POPPER_OPTIONS,
        placement: 'bottom-start',
        className: cx(styles.popover, popupClassName),
        onOpen: handleOpen,
        onClose: handleClose,
        rootId,
        ...restPopupProps,
      },
      commonProps: {
        selectedValue: value,
        searchValue,
        onChange: handleChange,
        onSubmit: null,
        options: options,
        filter,
        size,
        updateSearchValue: handleChangeSearchValue,
        isOpen,
        clearable,
        searchable,
        loading,
        disabled,
        targetRef: combinedTargetRef,
        popupRef: combinedPopupRef,
        testPrefix: `${testPrefix}select-`,
        submittable: null,
        allowSelectAll: null,
      },
      itemProps,
      loadingProps,
      noOptionsProps,
      tagProps: null,
    }),
    [
      className,
      clearable,
      combinedPopupRef,
      combinedTargetRef,
      disabled,
      errorBorder,
      errorTooltipAutoShow,
      errorTooltipText,
      filter,
      handleChange,
      handleChangeSearchValue,
      isOpen,
      itemProps,
      loading,
      loadingProps,
      noOptionsProps,
      options,
      placeholder,
      popupClassName,
      restPopupProps,
      rootId,
      searchValue,
      searchable,
      size,
      targetId,
      targetProps,
      testPrefix,
      value,
    ],
  )

  const filteredOptions = useMemo(() => filter(options, searchValue), [filter, options, searchValue])
  const optionsToRender = children || filteredOptions.map((op) => <SelectItem key={op.value} option={op} />)
  const isRenderNoOptions = !children && filteredOptions.length === 0

  return (
    <SelectContext.Provider value={contextValue}>
      <Target
        // из-за дефолтного значения компонента Target ts думает, что компонент Select УЖЕ инстанцирован с типом HTMLInputTarget
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ref={combinedTargetRef}
      />
      <Popup ref={combinedPopupRef}>
        {loading && <Loading />}

        {isRenderNoOptions && !loading && <NoOptions />}

        {!isRenderNoOptions && !loading && optionsToRender}
      </Popup>
    </SelectContext.Provider>
  )
}
