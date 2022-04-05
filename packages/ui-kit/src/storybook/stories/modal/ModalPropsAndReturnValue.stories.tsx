import { withKnobs } from '@storybook/addon-knobs'
import { useModal } from '@city/ui-kit-core'
import React, { useCallback, useState } from 'react'
import { Input } from '../../../components/Input'
import { Button } from '../../..'
import { RegularModal } from './modal-examples/RegularModal'
import styles from './styles.module.scss'

export default {
  title: 'Modals/Modal Props',
  decorators: [withKnobs],
}

const ModalStory = () => {
  const { openModal } = useModal()
  const [name, setName] = useState('')
  const [result, setResult] = useState(null)

  const onClick = useCallback(() => {
    setResult(null)
    openModal(RegularModal, { timeout: 300, props: { name: name || 'Nobody' } })
      .then((result) => {
        setResult(result)
      })
      .catch((result) => {
        setResult(result)
      })
  }, [name, openModal])

  return (
    <>
      <Input value={name} onChange={setName} />
      <Button className="mt-12" onClick={onClick}>
        Открыть модал
      </Button>
      <div className="mt-12">
        <strong>{result !== null && (result ? 'Нажата кнопка OK' : 'Нажата кнопка Cancel')}</strong>
      </div>
    </>
  )
}

export const Preview = () => {
  return (
    <div>
      <ModalStory />
      <div className={styles.note}>
        Контролы storybook могут перекрывать модал, в обычном приложении модал не будет перекрываться другими
        элементами.
      </div>
    </div>
  )
}
