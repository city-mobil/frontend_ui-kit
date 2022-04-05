import React from 'react'

import { GenericTransform } from './GenericTransform'
import { TransitionProps } from './types'

export const SlideInRight: React.FC<React.PropsWithChildren<TransitionProps>> = (
  props: React.PropsWithChildren<TransitionProps>,
) => {
  return <GenericTransform {...props} start={{ transform: 'translateX(100%)' }} end={{ transform: 'translateX(0%)' }} />
}
