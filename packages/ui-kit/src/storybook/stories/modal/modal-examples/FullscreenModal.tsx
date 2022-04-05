import React, { useCallback } from 'react'
import { ModalProps } from '@city/ui-kit-core'
import { FullScreenModal } from '../../../../components/Modals'
import { Button } from '../../../..'

export const FullscreenModal = ({ onSuccess }: ModalProps): JSX.Element => {
  const onClose = useCallback(() => {
    onSuccess(true)
  }, [onSuccess])

  return (
    <FullScreenModal>
      <h3 className="mb-16">Полноэкранный модал</h3>
      <div>
        <Button onClick={onClose} variant="primary">
          Закрыть модал
        </Button>
      </div>
    </FullScreenModal>
  )
}
