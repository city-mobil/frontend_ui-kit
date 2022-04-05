import { Modifier } from 'react-popper'

const OFFSET_MODIFIER: Modifier<unknown> = {
  name: 'offset',
  options: {
    offset: [0, 15],
  },
}

export const POPPER_OPTIONS = {
  modifiers: [OFFSET_MODIFIER],
}
