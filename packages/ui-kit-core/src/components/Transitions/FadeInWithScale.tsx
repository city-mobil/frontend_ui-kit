import React from 'react'

import { GenericTransform } from './GenericTransform'
import { TransitionProps } from './types'

export const FadeInWithScale: React.FC<React.PropsWithChildren<TransitionProps>> = (
  props: React.PropsWithChildren<TransitionProps>,
) => {
  return (
    <GenericTransform
      {...props}
      start={{ opacity: '0', transform: 'scale(0.66)' }}
      end={{ opacity: '1', transform: 'scale(1)' }}
    />
  )
}
