import { OverlayRef } from '@city/ui-kit-core'
import React, { ForwardRefExoticComponent, MutableRefObject, ReactNode, Ref } from 'react'

import { Size } from '../../types'
import { PopoverPropsWithTargetId } from '../Popover'

export type SelectValue = number | string

export type SelectBaseOption = {
  value: SelectValue
  label: string
  [key: string]: any
}

export interface ContextTargetProps extends React.HTMLAttributes<HTMLElement> {
  targetId: string
  errorTooltipText: string
  errorTooltipAutoShow: boolean
  errorBorder: boolean
  placeholder: string
}

export interface DataAttributes {
  [key: `data-${string}`]: string
}

export type TargetPropsProp = Omit<React.HTMLAttributes<HTMLElement>, 'id' | 'className'> & DataAttributes

export type ContextPopupProps = PopoverPropsWithTargetId & DataAttributes

export type ContextItemProps = React.HTMLAttributes<HTMLElement> & DataAttributes

export type ContextNoOptionsProps = React.HTMLAttributes<HTMLElement> & DataAttributes

export type ContexLoadingProps = React.HTMLAttributes<HTMLElement> & DataAttributes

export type ContextTagProps = React.HTMLAttributes<HTMLElement> & DataAttributes

export type SelectHandleChange<T extends SelectBaseOption = SelectBaseOption> = (option: T | null) => void
export type MultiselectHandleChange<T extends SelectBaseOption = SelectBaseOption> = (options: T[]) => void
export type SubmitFunc<T extends SelectBaseOption = SelectBaseOption> = MultiselectHandleChange<T>
export interface ContextCommonProps<
  IsMulty extends boolean | null = null,
  T extends SelectBaseOption = SelectBaseOption,
  E extends HTMLElement = HTMLElement,
> {
  selectedValue: IsMulty extends null ? T | T[] | null : IsMulty extends true ? T[] : T | null
  searchValue: string
  options: T[]
  size: Size
  isOpen: boolean
  clearable: boolean
  loading: boolean
  disabled: boolean
  searchable: boolean
  onChange: IsMulty extends null
    ? SelectHandleChange<T> | MultiselectHandleChange<T>
    : IsMulty extends true
    ? MultiselectHandleChange<T>
    : SelectHandleChange<T>
  onSubmit: IsMulty extends null ? SubmitFunc | null : IsMulty extends true ? SubmitFunc : null
  updateSearchValue: (v: string) => void
  filter: <P extends SelectBaseOption = SelectBaseOption>(options: P[], searchString: string) => P[]
  targetRef: MutableRefObject<E | null>
  popupRef: MutableRefObject<OverlayRef | null>
  testPrefix: string
  submittable: boolean | null
  allowSelectAll: boolean | null
}

export interface SelectContextValue<
  IsMulty extends boolean | null = null,
  T extends SelectBaseOption = SelectBaseOption,
  E extends HTMLElement = HTMLElement,
> {
  targetProps: ContextTargetProps
  popupProps: ContextPopupProps
  commonProps: ContextCommonProps<IsMulty, T, E>
  itemProps: ContextItemProps
  noOptionsProps: ContextNoOptionsProps
  loadingProps: ContexLoadingProps
  tagProps: IsMulty extends null ? ContextTagProps | null : IsMulty extends true ? ContextTagProps : null
}

export interface SelectItemProps<T extends SelectBaseOption = SelectBaseOption> {
  option: T
}

export interface MultiselectItemProps<T extends SelectBaseOption = SelectBaseOption> extends SelectItemProps<T> {
  isSelected: boolean
}

export interface TagProps<T extends SelectBaseOption = SelectBaseOption> {
  option?: T
}

export interface SelectPopupProps {
  children?: ReactNode
}

export interface SelectAllItemProps {
  label?: string
}

export interface MultiselectPopupProps {
  children?: ReactNode
  SelectAllItem: (props: SelectAllItemProps) => JSX.Element | null
}

export interface MultiselectTargetProps<T extends SelectBaseOption = SelectBaseOption> {
  Tag: (props: TagProps<T>) => JSX.Element | null
}

export interface SelectComponentsCommon {
  Popup?: ForwardRefExoticComponent<SelectPopupProps & React.RefAttributes<OverlayRef>>
  NoOptions?: () => JSX.Element | null
  Loading?: () => JSX.Element | null
}

export interface SelectComponents<T extends SelectBaseOption = SelectBaseOption, E extends HTMLElement = HTMLElement>
  extends SelectComponentsCommon {
  Target?: ForwardRefExoticComponent<Record<string, unknown> & React.RefAttributes<E>>
  SelectItem?: (props: SelectItemProps<T>) => JSX.Element | null
}

export interface MultiselectComponents<
  T extends SelectBaseOption = SelectBaseOption,
  E extends HTMLElement = HTMLElement,
> extends SelectComponentsCommon {
  Target?: ForwardRefExoticComponent<MultiselectTargetProps & React.RefAttributes<E>>
  SelectItem?: (props: MultiselectItemProps<T>) => JSX.Element | null
  Tag?: (props: TagProps<T>) => JSX.Element | null
  SelectAllItem?: (props: SelectAllItemProps) => JSX.Element | null
}

export interface SelectCommonProps<T extends SelectBaseOption = SelectBaseOption, E extends HTMLElement = HTMLElement> {
  onSearchStringChange?: (v: string) => void
  options?: T[]
  children?: ReactNode
  clearable?: boolean
  loading?: boolean
  disabled?: boolean
  searchable?: boolean
  errorTooltipText?: string
  errorTooltipAutoShow?: boolean
  errorBorder?: boolean
  placeholder?: string
  size?: Size
  rootId?: string
  targetRef?: Ref<E>
  popupRef?: Ref<OverlayRef>
  testPrefix?: string
  className?: string
  popupProps?: Omit<ContextPopupProps, 'targetId' | 'id'>
  targetProps?: TargetPropsProp
  itemProps?: ContextItemProps
  loadingProps?: ContexLoadingProps
  noOptionsProps?: ContextNoOptionsProps
  filter?: <P extends SelectBaseOption = SelectBaseOption>(options: P[], searchString: string) => P[]
}

export interface SelectProps<T extends SelectBaseOption = SelectBaseOption, E extends HTMLElement = HTMLElement>
  extends SelectCommonProps<T, E> {
  value: T | null
  onChange: (option: T | null) => void
  components?: SelectComponents<T, E>
}

export interface MultiselectProps<T extends SelectBaseOption = SelectBaseOption, E extends HTMLElement = HTMLElement>
  extends SelectCommonProps<T, E> {
  value: T[]
  onChange: (options: T[]) => void
  /**
   * @property `Tag` - компонент для отрисовки выбранной/выбранных опций внутри компонента Target.
   * prop `option` для компонента `Tag` имеет тип `T` в случае, когда `size` мультиселекта равен `'lg'`; иначе - `undefined`.
   * это связано с дизайном компонента: в случае `size='lg'` для каждой выбранной опции рисуется тег; иначе - один тег "Выбрано N"
   */
  components?: MultiselectComponents<T, E>
  submittable?: boolean
  allowSelectAll?: boolean
  tagProps?: ContextTagProps
}
