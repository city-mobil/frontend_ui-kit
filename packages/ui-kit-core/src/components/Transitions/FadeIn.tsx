import React from 'react'

import { GenericTransform } from './GenericTransform'
import { TransitionProps } from './types'

export const FadeIn: React.FC<React.PropsWithChildren<TransitionProps>> = (
  props: React.PropsWithChildren<TransitionProps>,
) => {
  return <GenericTransform {...props} start={{ opacity: '0' }} end={{ opacity: '1' }} />
}
