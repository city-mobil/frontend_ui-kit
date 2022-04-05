import React from 'react'

import { GenericTransform } from './GenericTransform'
import { TransitionProps } from './types'

export const Scale: React.FC<React.PropsWithChildren<TransitionProps>> = (
  props: React.PropsWithChildren<TransitionProps>,
) => {
  return <GenericTransform {...props} start={{ transform: 'scale(0)' }} end={{ transform: 'scale(1)' }} />
}
