import React, { useState } from 'react'
import { Calendar, CalendarProps } from '../../../components/DatePickers'
import styles from './styles.module.scss'

export default {
  title: 'DatePickers/Calendar',
  component: Calendar,
}

export const PrimaryStory = (props: CalendarProps) => {
  const [date, setDate] = useState<Date | null>(new Date())

  return (
    <div className={styles.container}>
      <Calendar {...props} onChange={setDate} value={date} />
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
