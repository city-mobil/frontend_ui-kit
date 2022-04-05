import React, { useCallback, useState } from 'react'
import { TimeSelect, TimeSelectProps } from '../../../components/TimeSelect'
import styles from './TimeSelect.module.scss'

export default {
  title: 'TimeSelect/TimeSelect',
  component: TimeSelect,
}

export const PrimaryStory = (props: TimeSelectProps) => {
  const [hours, setHours] = useState('1')
  const [minutes, setMinutes] = useState('1234')

  const onChange = useCallback(({ hours, minutes }) => {
    setHours(hours)
    setMinutes(minutes)
  }, [])

  return (
    <div className={styles.container}>
      <TimeSelect {...props} size="xs" onChange={onChange} hours={hours} minutes={minutes} />
      <TimeSelect {...props} size="sm" placeholder="" onChange={onChange} hours={hours} minutes={minutes} />
      <TimeSelect
        {...props}
        size="md"
        placeholder="a custom placeholder"
        onChange={onChange}
        hours={hours}
        minutes={minutes}
      />
      <TimeSelect {...props} size="lg" onChange={onChange} hours={hours} minutes={minutes} />
    </div>
  )
}

PrimaryStory.argTypes = {
  initialValue: {},
}
