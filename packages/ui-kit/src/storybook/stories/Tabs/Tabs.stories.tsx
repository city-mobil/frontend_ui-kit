import React, { useState } from 'react'
import { Tabs, TabsProps } from '../../../components/Tabs'
import { Button } from '../../../components/Buttons'
import styles from './Tabs.module.scss'

export default {
  title: 'Navigation/Tabs',
  component: Tabs,
}

export const PrimaryStory = (props: TabsProps) => <Tabs {...props} />

const getOptions = (count = 123) => [
  {
    label: 'First tab',
    value: 'firstTab',
  },
  {
    label: 'Second tab',
    value: 'secondTab',
  },
  {
    label: 'Third tab',
    value: 'thirdTab',
    badge: <div className={styles.counter}>{count}</div>,
  },
]

PrimaryStory.args = {
  activeTab: 'firstTab',
  options: getOptions(),
  hideActiveBadge: false,
}

PrimaryStory.argTypes = {
  activeTab: {
    control: {
      type: 'select',
      options: getOptions().map((item) => item.value),
    },
  },
  options: {
    control: null,
  },
}

export const DynamicBadgeContent = () => {
  const [count, setCount] = useState(123)
  const options = getOptions(count)
  const [activeTab, setActiveTab] = useState('firstTab')
  const onChange = (activeTab: string) => {
    setActiveTab(activeTab)
  }

  const onClickButton = () => {
    setCount((prevCount) => prevCount + 1)
  }

  return (
    <>
      <Tabs options={options} onChange={onChange} activeTab={activeTab} />
      <Button type="button" onClick={onClickButton}>
        Increase badge count
      </Button>
    </>
  )
}

DynamicBadgeContent.argTypes = {
  activeTab: {
    control: {
      type: 'select',
      options: getOptions().map((item) => item.value),
    },
  },
  options: {
    control: null,
  },
}
