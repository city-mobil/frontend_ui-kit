import React from 'react'

import { HOURS, MINUTES } from './helpers'
import { NumbersList } from './NumbersList'
import styles from './TimeSelect.module.scss'
import { TimeSelectListProps } from './types'

export const TimeSelectList: React.FC<TimeSelectListProps> = ({ hours, minutes, onChange, testPrefix }) => {
  const onHourChange = (hours: string): void => {
    onChange({ hours, minutes })
  }

  const onMinuteChange = (minutes: string): void => {
    onChange({ hours, minutes })
  }

  return (
    <div className={styles.timeSelectList}>
      <NumbersList numbers={HOURS} value={hours} onChange={onHourChange} testPrefix={`${testPrefix}-hours`} />
      <div className={styles.separator}>:</div>
      <NumbersList numbers={MINUTES} value={minutes} onChange={onMinuteChange} testPrefix={`${testPrefix}-minutes`} />
    </div>
  )
}
