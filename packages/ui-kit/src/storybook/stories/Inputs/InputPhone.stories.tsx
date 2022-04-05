import React, { useState } from 'react'
import { InputPhone, InputPhoneProps } from '../../../components/InputPhone'
import styles from './InputPhone.module.scss'

export default {
  title: 'Inputs/InputPhone',
  component: InputPhone,
}

export const PrimaryStory = ({ ...rest }: InputPhoneProps) => {
  const [phone, setPhone] = useState('')

  return (
    <div className={styles.primaryContainer}>
      <InputPhone {...rest} value={phone} onChange={(v) => setPhone(v)} />
    </div>
  )
}

export const Preview = () => {
  const [value2, setValue2] = useState('')
  const [value, setValue] = useState('79997776688')

  return (
    <div className={styles.container}>
      <InputPhone value={value2} onChange={(v) => setValue2(v)} size="xs" />
      <InputPhone value={value2} onChange={(v) => setValue2(v)} size="sm" />
      <InputPhone value={value2} onChange={(v) => setValue2(v)} size="md" />
      <InputPhone value={value2} onChange={(v) => setValue2(v)} size="lg" />

      <InputPhone value={value} onChange={(v) => setValue(v)} size="xs" disabled />
      <InputPhone value={value} onChange={(v) => setValue(v)} size="sm" disabled />
      <InputPhone value={value} onChange={(v) => setValue(v)} size="md" disabled />
      <InputPhone value={value} onChange={(v) => setValue(v)} size="lg" disabled />
    </div>
  )
}
