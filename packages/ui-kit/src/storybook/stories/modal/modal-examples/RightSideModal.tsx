import React, { useCallback } from 'react'
import { ModalProps } from '@city/ui-kit-core'
import { Button } from '../../../..'
import styles from './RightSideModal.module.scss'

export const RightSideAnimationContainer: React.FC = ({ children }) => (
  <div className={styles.animationContainer}>{children}</div>
)

export const RightSideModal = ({ onSuccess }: ModalProps): JSX.Element => {
  const onClose = useCallback(() => {
    onSuccess(true)
  }, [onSuccess])

  return (
    <div className={styles.sidePanel}>
      <h3 className="mb-16">Правая панель</h3>
      <div className="mt-8">
        <Button onClick={onClose} variant="primary">
          Закрыть модал
        </Button>
      </div>
    </div>
  )
}
