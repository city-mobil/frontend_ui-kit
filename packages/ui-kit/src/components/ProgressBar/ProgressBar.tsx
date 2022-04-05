import React, { CSSProperties } from 'react'

import styles from './ProgressBar.module.scss'

export interface ProgressBarProps {
  percent: number
  label?: React.ReactNode
}

export const ProgressBar = ({ percent, label }: ProgressBarProps): JSX.Element => {
  const percentStyle: CSSProperties = { width: `${percent}%` }

  return (
    <div>
      {label}
      <div className={styles.wrapper}>
        <div className={styles.bar} style={percentStyle} />
      </div>
    </div>
  )
}
