import { withKnobs } from '@storybook/addon-knobs'
import { useModal } from '@city/ui-kit-core'
import React, { useCallback, useState } from 'react'
import { Button } from '../../..'
import { RegularModal } from './modal-examples/RegularModal'
import styles from './styles.module.scss'

export default {
  title: 'Modals/Modal Backdrop',
  decorators: [withKnobs],
}

const Counter = () => {
  const [counter, setCounter] = useState(0)
  const onClick = useCallback(() => {
    setCounter((cnt) => cnt + 1)
  }, [])

  return (
    <div className="mt-12 mb-12">
      Счетчик: <strong>{counter}</strong> &emsp;
      <Button onClick={onClick}> +1 </Button>
    </div>
  )
}

const ModalStory = () => {
  const { openModal } = useModal()

  const openClosableModal = useCallback(() => {
    openModal(RegularModal, { timeout: 300, closeOnBackdropClick: true }).catch((result) => result)
  }, [openModal])

  const openNonClosableModal = useCallback(() => {
    openModal(RegularModal, { timeout: 300, closeOnBackdropClick: false }).catch((result) => result)
  }, [openModal])

  const openModalWithoutBackdrop = useCallback(() => {
    openModal(RegularModal, { timeout: 300, noBackdrop: true }).catch((result) => result)
  }, [openModal])

  return (
    <>
      <div className="mt-8">
        <Button onClick={openClosableModal}>Открыть c закрытием по клику на бэкдроп</Button>
      </div>
      <div className="mt-8">
        <Button onClick={openNonClosableModal}>Открыть без закрытия по клику на бэкдроп</Button>
      </div>
      <div className="mt-8">
        <Button onClick={openModalWithoutBackdrop}>Открыть без бэкдропа (страница под модалом активна)</Button>
      </div>
    </>
  )
}

export const Preview = () => {
  return (
    <>
      <Counter />
      <ModalStory />
      <div className={styles.note}>
        Контролы storybook могут перекрывать модал, в обычном приложении модал не будет перекрываться другими
        элементами.
      </div>
    </>
  )
}
