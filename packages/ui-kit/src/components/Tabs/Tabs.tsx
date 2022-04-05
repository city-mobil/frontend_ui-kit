import cx from 'classnames'
import React from 'react'

import { noop } from '../../helpers'
import styles from './Tabs.module.scss'

export interface TabsProps {
  activeTab: string
  options: Array<{ value: string; label: string; badge?: React.ReactElement }>
  onChange: (activeTab: string) => void
  hideActiveBadge?: boolean
  className?: string
}

export const Tabs = ({
  onChange = noop,
  activeTab,
  options,
  hideActiveBadge = false,
  className,
}: TabsProps): JSX.Element => {
  const onTabClick = (value: string) => (): void => {
    onChange(value)
  }

  return (
    <ul className={cx(styles.wrapper, className)}>
      {options.map(({ value, label, badge }) => {
        const isBadgeVisible = badge && !(hideActiveBadge && value === activeTab)

        return (
          <li
            key={value}
            className={cx(styles.tab, { [styles.tab__active]: value === activeTab })}
            onClick={onTabClick(value)}
            role="presentation"
          >
            <div className={styles.content}>
              <span className={styles.text}>{label}</span>
              {isBadgeVisible && badge}
            </div>
          </li>
        )
      })}
    </ul>
  )
}
