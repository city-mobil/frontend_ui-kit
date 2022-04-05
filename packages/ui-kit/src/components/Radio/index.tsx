import React from 'react'

import { Radio as InternalRadio, RadioProps } from './Radio'
import { RadioGroup } from './RadioGroup'

export interface RadioSubcomponents {
  Group: typeof RadioGroup
}

export const Radio: React.FC<RadioProps> & RadioSubcomponents = (props: RadioProps) => <InternalRadio {...props} />
Radio.Group = RadioGroup

export type { RadioProps }
