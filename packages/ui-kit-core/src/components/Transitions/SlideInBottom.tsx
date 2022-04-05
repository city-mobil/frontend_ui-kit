import React from 'react'

import { GenericTransform } from './GenericTransform'
import { TransitionProps } from './types'

export const SlideInBottom: React.FC<React.PropsWithChildren<TransitionProps>> = (
  props: React.PropsWithChildren<TransitionProps>,
) => {
  return <GenericTransform {...props} start={{ transform: 'translateY(100%)' }} end={{ transform: 'translateY(0%)' }} />
}
