import React, { useState } from 'react'
import { DatePicker, DatePickerProps } from '../../../components/DatePickers'
import styles from './styles.module.scss'

export default {
  title: 'DatePickers/DatePicker',
  component: DatePicker,
}

export const PrimaryStory = (props: DatePickerProps) => {
  return (
    <div className={styles.spacer}>
      <DatePicker {...props} />
    </div>
  )
}

PrimaryStory.argTypes = {
  value: {
    control: null,
  },
  disabledDays: {
    control: null,
  },
}

export const StatesPreview = () => {
  return (
    <div className={styles.spacer}>
      <DatePicker size={'xs'} />
      <div className={'mb-20'} />
      <DatePicker size={'sm'} />
      <div className={'mb-20'} />
      <DatePicker size={'md'} />
      <div className={'mb-20'} />
      <DatePicker size={'lg'} />
    </div>
  )
}

export const Controlled = () => {
  const [val, setVal] = useState<Date | null>(new Date('1952-10-07'))

  return (
    <div className={styles.spacer}>
      <DatePicker value={val} onChange={setVal} />
    </div>
  )
}

export const WithDisabledDates = () => {
  return (
    <div className={styles.spacer}>
      <DatePicker disabledDays={{ from: new Date(0), to: new Date() }} />
    </div>
  )
}
