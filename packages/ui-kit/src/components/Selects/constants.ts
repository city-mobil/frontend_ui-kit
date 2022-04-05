import { noop, OVERLAY_ROOT_ID } from '@city/ui-kit-core'
import { Modifier } from 'react-popper'

import { selectOptionsFilter } from './helpers'
import { SelectContextValue } from './types'

export const DEFAULT_SELECT_CONTEXT_VALUE: SelectContextValue = {
  targetProps: {
    targetId: '',
    errorBorder: false,
    errorTooltipText: '',
    errorTooltipAutoShow: true,
    placeholder: '',
  },
  popupProps: {
    targetId: '',
    arrow: false,
    popperOptions: {},
    placement: 'bottom-start',
    className: '',
    onOpen: noop,
    onClose: noop,
    rootId: OVERLAY_ROOT_ID,
  },
  commonProps: {
    selectedValue: {
      value: -1,
      label: '',
    },
    searchValue: '',
    onChange: noop,
    onSubmit: noop,
    options: [],
    filter: selectOptionsFilter,
    size: 'sm',
    updateSearchValue: noop,
    isOpen: false,
    clearable: false,
    searchable: false,
    loading: false,
    disabled: false,
    targetRef: { current: null },
    popupRef: { current: null },
    testPrefix: '',
    submittable: null,
    allowSelectAll: null,
  },
  itemProps: {},
  noOptionsProps: {},
  loadingProps: {},
  tagProps: {},
}

const SAME_WIDTH_MODIFIER: Modifier<unknown> = {
  name: 'sameWidth',
  enabled: true,
  fn: ({ state }) => {
    state.styles.popper.width = `${state.rects.reference.width}px`
  },
  phase: 'beforeWrite',
  requires: ['computeStyles'],
}

const BASE_OFFSET_MODIFIER: Modifier<unknown> = {
  name: 'offset',
  options: {
    offset: [0, 4],
  },
}

export const BASE_SELECT_POPPER_OPTIONS = {
  modifiers: [SAME_WIDTH_MODIFIER, BASE_OFFSET_MODIFIER],
}

export const FLAT_SELECT_POPPER_OPTIONS = {
  modifiers: [BASE_OFFSET_MODIFIER],
}

export const DEFAULT_INPUT_WIDTH = 15
export const DEFAULT_PLACEHOLDER = 'Выберете значение'
