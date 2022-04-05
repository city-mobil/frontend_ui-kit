import React, { useCallback } from 'react'
import { ModalProps } from '@city/ui-kit-core'
import { Modal, ModalBody, ModalButtons, ModalCloseIcon, ModalFooter, ModalHeader } from '../../../../components/Modals'
import { Button } from '../../../..'

type RegularModalProps = ModalProps & { name: string }

export const RegularModal = ({ onSuccess, onCancel, name = 'User' }: RegularModalProps): JSX.Element => {
  const onSuccessAction = useCallback(() => {
    onSuccess(true)
  }, [onSuccess])

  const onCancelAction = useCallback(() => {
    onCancel(false)
  }, [onCancel])

  return (
    <Modal>
      <ModalCloseIcon onClick={onCancelAction} />
      <ModalHeader>
        <h3 className="mb-16">Привет, {name}!</h3>
      </ModalHeader>
      <ModalBody>Это демо модал</ModalBody>
      <ModalFooter>
        <ModalButtons>
          <Button onClick={onSuccessAction} variant="primary">
            Ок
          </Button>
          <Button onClick={onCancelAction} variant="secondary">
            Отмена
          </Button>
        </ModalButtons>
      </ModalFooter>
    </Modal>
  )
}
