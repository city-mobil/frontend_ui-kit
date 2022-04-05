import { noop, OVERLAY_ROOT_ID, OverlayRef, useUniqueId } from '@city/ui-kit-core'
import cx from 'classnames'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { useCombinedRefs } from '../../hooks'
import { MultiselectDefaults } from './components'
import { BASE_SELECT_POPPER_OPTIONS } from './constants'
import { SelectContext } from './context'
import { selectOptionsFilter } from './helpers'
import styles from './Select.module.scss'
import { MultiselectProps, SelectBaseOption, SelectContextValue } from './types'

export const Multiselect = <T extends SelectBaseOption = SelectBaseOption, E extends HTMLElement = HTMLElement>(
  props: MultiselectProps<T, E>,
): JSX.Element => {
  const {
    value,
    options = [],
    children,
    onChange,
    onSearchStringChange = noop,
    components,
    clearable = false,
    loading = false,
    searchable = false,
    disabled = false,
    errorBorder = false,
    submittable = false,
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
    tagProps = {},
    filter = selectOptionsFilter,
    allowSelectAll = false,
  } = props

  const [stateValue, setStateValue] = useState<T[]>(value)
  const [searchValue, setSearchValue] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const targetId = useUniqueId()
  const internalPopupRef = useRef<OverlayRef | null>(null)
  const combinedPopupRef = useCombinedRefs(popupRef, internalPopupRef)
  const internalTargetRef = useRef<E | null>(null)
  const combinedTargetRef = useCombinedRefs(targetRef, internalTargetRef)

  useEffect(() => {
    if (!submittable) return

    setStateValue(value)
  }, [submittable, value])

  const handleChange = useCallback(
    (options: SelectBaseOption[]): void => {
      if (submittable) {
        setStateValue(options as T[])
      } else {
        onChange(options as T[])
      }
    },
    [onChange, submittable],
  )

  const handleSubmit = useCallback(
    (options: SelectBaseOption[]): void => {
      onChange(options as T[])

      internalPopupRef.current?.hide()
    },
    [onChange],
  )

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

  const handleClose = useCallback((): void => {
    setIsOpen(false)
    setSearchValue('')
    setStateValue(value)
  }, [value])

  const { className: popupClassName, ...restPopupProps } = popupProps

  const contextValue: SelectContextValue = useMemo(
    () => ({
      targetProps: {
        targetId,
        errorBorder,
        errorTooltipText,
        errorTooltipAutoShow,
        placeholder,
        ...targetProps,
      },
      popupProps: {
        targetId,
        arrow: false,
        popperOptions: BASE_SELECT_POPPER_OPTIONS,
        placement: 'bottom-start',
        className: cx(
          styles.multiselectPopover,
          { [styles.multiselectPopover__submittable]: submittable },
          popupClassName,
        ),
        onOpen: handleOpen,
        onClose: handleClose,
        rootId,
        ...restPopupProps,
      },
      commonProps: {
        selectedValue: submittable ? stateValue : value,
        searchValue,
        onChange: handleChange,
        onSubmit: handleSubmit,
        options: options || [],
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
        submittable,
        allowSelectAll,
      },
      itemProps,
      loadingProps,
      noOptionsProps,
      tagProps,
    }),
    [
      allowSelectAll,
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
      handleClose,
      handleSubmit,
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
      stateValue,
      submittable,
      tagProps,
      targetId,
      targetProps,
      testPrefix,
      value,
    ],
  )

  const filteredOptions = useMemo(() => filter(options, searchValue), [filter, options, searchValue])
  const isRenderNoOptions = !children && filteredOptions.length === 0

  const {
    Target = MultiselectDefaults.Target,
    Popup = MultiselectDefaults.Popup,
    NoOptions = MultiselectDefaults.NoOptions,
    SelectItem = MultiselectDefaults.Item,
    Loading = MultiselectDefaults.Loading,
    Tag = MultiselectDefaults.Tag,
    SelectAllItem = MultiselectDefaults.SelectAllItem,
  } = components || {}

  const optionsToRender =
    children ||
    filteredOptions.map((op) => {
      let isSelected = false
      const selectedValue = submittable ? stateValue : value

      for (const selectedOption of selectedValue) {
        if (selectedOption.value === op.value) {
          isSelected = true
          break
        }
      }

      return <SelectItem key={op.value} option={op} isSelected={isSelected} />
    })

  return (
    <SelectContext.Provider value={contextValue}>
      <Target
        // из-за дефолтного значения компонента Target ts думает, что компонент Target УЖЕ инстанцирован с типом HTMLInputTarget
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ref={combinedTargetRef}
        // из-за дефолтного значения компонента Target ts думает, что компонент Target УЖЕ инстанцирован с типом SelectBaseOption
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        Tag={Tag}
        className={className}
      />
      <Popup ref={combinedPopupRef} SelectAllItem={SelectAllItem}>
        {loading && <Loading />}

        {isRenderNoOptions && !loading && <NoOptions />}

        {!isRenderNoOptions && !loading && optionsToRender}
      </Popup>
    </SelectContext.Provider>
  )
}
