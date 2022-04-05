import React from 'react'

import { GenericTransform } from './GenericTransform'
import { TransitionProps } from './types'

export const NoTransition: React.FC<React.PropsWithChildren<TransitionProps>> = (
  props: React.PropsWithChildren<TransitionProps>,
) => {
  return <GenericTransform {...props} start={{}} end={{}} timeout={0} />
}
