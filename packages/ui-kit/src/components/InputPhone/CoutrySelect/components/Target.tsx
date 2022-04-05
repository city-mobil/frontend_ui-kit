import cx from 'classnames'
import React, { forwardRef, useRef } from 'react'

import { useCombinedRefs } from '../../../../hooks'
import { InputPlaceholder, InputSuffixIcons } from '../../../../internal/components'
import { useSelectContext } from '../../../Selects'
import { useTargetContainer } from '../../../Selects/components/Targets/useTargetContainer'
import { CountrySelectOption } from '../../types'
import styles from './Target.module.scss'

type IsSelectContextMulti = false

export const Target = React.memo(
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
    const { commonProps } = useSelectContext<IsSelectContextMulti, CountrySelectOption>()

    if (!commonProps.selectedValue) return null

    const {
      size,
      selectedValue: { Flag },
    } = commonProps

    const targetWrapperClassName = cx(targetWrapperProps.className, styles.target, styles[size])
    const targetContentClassName = cx(styles.targetWrapper, { [styles.lgTarget]: size === 'lg' })

    return (
      <div {...targetWrapperProps} className={targetWrapperClassName}>
        <div {...targetContentProps} className={targetContentClassName}>
          <Flag />
          <span {...inputMirrorProps}>{inputMirrorLabel}</span>
          {showInput && <input {...inputProps} ref={combinedInputRef} />}
        </div>

        {showInputPlaceholder && <InputPlaceholder {...inputPlaceholderProps}>{inputPlaceholder}</InputPlaceholder>}

        <InputSuffixIcons {...inputSuffixIconsProps} />
      </div>
    )
  }),
)

Target.displayName = 'Target'
