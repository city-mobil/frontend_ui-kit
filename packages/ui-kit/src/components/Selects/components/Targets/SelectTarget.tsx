import React, { forwardRef, useRef } from 'react'

import { useCombinedRefs } from '../../../../hooks'
import { InputPlaceholder, InputSuffixIcons } from '../../../../internal/components'
import { useSelectContext } from '../..'
import { useTargetContainer } from './useTargetContainer'

export const SelectTarget = React.memo(
  forwardRef<HTMLInputElement, Record<string, unknown>>((_, ref) => {
    const inputRef = useRef<HTMLInputElement | null>(null)
    const combinedInputRef = useCombinedRefs(ref, inputRef)
    const { targetProps } = useSelectContext()
    const { className = '' } = targetProps

    const {
      targetWrapperProps,
      targetContentProps,
      inputSuffixIconsProps,
      inputProps,
      inputMirrorProps,
      inputMirrorLabel,
      inputPlaceholderProps,
      inputPlaceholder,
      showInput,
      showInputPlaceholder,
    } = useTargetContainer({
      containerClassName: className,
      inputRef: combinedInputRef,
    })

    return (
      <div {...targetWrapperProps}>
        <div {...targetContentProps}>
          <span {...inputMirrorProps}>{inputMirrorLabel}</span>
          {showInput && <input {...inputProps} ref={combinedInputRef} />}
        </div>

        {showInputPlaceholder && <InputPlaceholder {...inputPlaceholderProps}>{inputPlaceholder}</InputPlaceholder>}

        <InputSuffixIcons {...inputSuffixIconsProps} />
      </div>
    )
  }),
)

SelectTarget.displayName = 'SelectTarget'
