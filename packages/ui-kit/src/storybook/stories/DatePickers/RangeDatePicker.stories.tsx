import React, { useState } from 'react'
import { DateRange, RangeDatePickerProps, RangeDatePicker } from '../../../components/DatePickers'
import styles from './styles.module.scss'

export default {
  title: 'DatePickers/RangeDatePicker',
  component: RangeDatePicker,
}

export const PrimaryStory = (props: RangeDatePickerProps) => {
  return (
    <div className={styles.spacer}>
      <RangeDatePicker {...props} />
    </div>
  )
}

PrimaryStory.argTypes = {
  disabledDays: {
    control: null,
  },
  startDate: {
    control: null,
  },
  endDate: {
    control: null,
  },
}

export const StatesPreview = () => {
  return (
    <div className={styles.spacer}>
      <RangeDatePicker size={'xs'} />
      <div className={'mb-20'} />
      <RangeDatePicker size={'sm'} />
      <div className={'mb-20'} />
      <RangeDatePicker size={'md'} />
      <div className={'mb-20'} />
      <RangeDatePicker size={'lg'} />
    </div>
  )
}

export const Controlled = () => {
  const [start, setStart] = useState<Date | null>(new Date('1905-01-22'))
  const [end, setEnd] = useState<Date | null>(new Date('1907-06-16'))

  return (
    <div className={styles.spacer}>
      <RangeDatePicker
        onChange={(dateRange: DateRange) => {
          setStart(dateRange.from)
          setEnd(dateRange.to)
        }}
        startDate={start}
        endDate={end}
      />
    </div>
  )
}

export const WithDisabledDates = () => {
  return (
    <div className={styles.spacer}>
      <RangeDatePicker disabledDays={{ from: new Date(0), to: new Date() }} />
    </div>
  )
}
