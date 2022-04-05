import { OverlayRef } from '@city/ui-kit-core'
import React, { forwardRef } from 'react'

import { Divider } from '../../../../internal/components'
import { Button } from '../../../Buttons'
import { Popover } from '../../../Popover'
import { useSelectContext } from '../../context'
import { MultiselectPopupProps } from '../../types'
import styles from './MultiselectPopup.module.scss'

type IsSelectContexMulty = true

export const MultiselectPopup = forwardRef<OverlayRef, MultiselectPopupProps>(({ children, SelectAllItem }, ref) => {
  const { popupProps, commonProps } = useSelectContext<IsSelectContexMulty>()
  const { submittable, onSubmit, selectedValue, allowSelectAll } = commonProps

  const handleSubmit = (): void => {
    onSubmit(selectedValue)
  }

  return (
    <Popover {...popupProps} ref={ref}>
      {allowSelectAll && <SelectAllItem />}

      {children}

      {submittable && (
        <div className={styles.submitContainer}>
          <Divider />
          <div className={styles.submitButtonContainer}>
            <Button onClick={handleSubmit} size="xs" fullWidth>
              Применить
            </Button>
          </div>
        </div>
      )}
    </Popover>
  )
})

MultiselectPopup.displayName = 'MultiselectPopup'
