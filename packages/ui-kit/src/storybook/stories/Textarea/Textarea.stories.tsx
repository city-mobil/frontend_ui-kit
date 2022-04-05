import React, { useState } from 'react'
import { Textarea, TextareaProps } from '../../../components/Textarea'
import styles from './styles.module.scss'

export default {
  title: 'Inputs/Textarea',
  component: Textarea,
}

export const PrimaryStory = (props: TextareaProps): JSX.Element => {
  const [value, setValue] = useState('')

  return <Textarea {...props} value={value || props.value} onChange={setValue} />
}

export const Demo = () => {
  const [value, setValue] = useState('')

  return (
    <div className={styles.test}>
      <div>
        <div>По умолчанию (нерасширяемая):</div>
        <Textarea value={value} placeholder="Введите текст" onChange={setValue} />
      </div>
      <div>
        <div>Disabled:</div>
        <Textarea disabled value={value} onChange={setValue} placeholder="Введите текст" />
      </div>
      <div>
        <div>Фиксированная высота 100px:</div>
        <Textarea className={styles.textArea} value={value} onChange={setValue} placeholder="Введите текст" />
      </div>
      <div>
        <div>Авторесайз, но не более 100px (autoresize=true):</div>
        <Textarea
          className={styles.textAreaAutoresize}
          autoresize
          value={value}
          onChange={setValue}
          placeholder="Введите текст"
        />
      </div>
      <div>
        <div>Без декорирования (flat=true):</div>
        <Textarea flat value={value} placeholder="Введите текст" onChange={setValue} />
      </div>
    </div>
  )
}
