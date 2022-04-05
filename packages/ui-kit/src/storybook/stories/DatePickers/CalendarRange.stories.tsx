import React, { useState } from 'react'
import { CalendarRange, CalendarRangeProps } from '../../../components/DatePickers'
import styles from './styles.module.scss'

type StateExample = Pick<CalendarRangeProps, 'startDate' | 'endDate'>

export default {
  title: 'DatePickers/CalendarRange',
  component: CalendarRange,
}

export const PrimaryStory = (props: CalendarRangeProps) => {
  const [date, setDate] = useState<StateExample>({ startDate: null, endDate: null })
  const onChange: CalendarRangeProps['onChange'] = ({ from, to }) => {
    setDate({ startDate: from, endDate: to })
  }

  return (
    <div className={styles.container}>
      <CalendarRange {...props} onChange={onChange} startDate={date.startDate} endDate={date.endDate} />
    </div>
  )
}

PrimaryStory.argTypes = {
  startDate: {
    control: null,
  },
  endDate: {
    control: null,
  },
  disabledDays: {
    control: null,
  },
}
