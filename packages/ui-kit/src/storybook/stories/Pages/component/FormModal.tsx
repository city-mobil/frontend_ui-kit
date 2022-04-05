import React, { FC, useCallback } from 'react'
import { Modal, ModalBody, ModalButtons, ModalCloseIcon, ModalFooter, ModalHeader } from '../../../../components/Modals'
import { Button } from '../../../../components/Buttons/Button'
import { ModalProps, Typography } from '@city/ui-kit-core'
import styles from './styles.module.scss'

export const FormModal: FC<ModalProps> = ({ onSuccess, onCancel }: ModalProps) => {
  const onSuccessAction = useCallback(() => {
    onSuccess(true)
  }, [onSuccess])

  const onCancelAction = useCallback(() => {
    onCancel(false)
  }, [onCancel])

  return (
    <Modal className={styles.narrowModal}>
      <ModalCloseIcon onClick={onCancelAction} />
      <ModalHeader>
        <h3 className="mb-16">Отмена изменений</h3>
      </ModalHeader>
      <ModalBody>
        <Typography.P13>Несохраненные данные будут удалены. Вы действительно хотите выйти?</Typography.P13>
      </ModalBody>
      <ModalFooter>
        <ModalButtons>
          <Button onClick={onSuccessAction} variant="primary">
            Да
          </Button>
          <Button onClick={onCancelAction} variant="secondary">
            Нет
          </Button>
        </ModalButtons>
      </ModalFooter>
    </Modal>
  )
}
